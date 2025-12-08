import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(createUserDto);
    return await this.generateAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return await this.generateAuthResponse(user);
  }

  async refreshToken(userId: number): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    const payload = { sub: user.id, email: user.email, name: user.name, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    return { accessToken };
  }

  async getProfile(userId: number): Promise<User> {
    return await this.userService.findOne(userId);
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User> {
    if (updateProfileDto.email) {
      const user = await this.userService.findOne(userId);
      if (updateProfileDto.email !== user.email) {
        const existingUser = await this.userService.findByEmail(updateProfileDto.email);
        if (existingUser) {
          throw new ConflictException('El email ya está registrado');
        }
      }
    }
    const allowedUpdates: Partial<User> = {};
    if (updateProfileDto.name !== undefined) {
      allowedUpdates.name = updateProfileDto.name;
    }
    if (updateProfileDto.email !== undefined) {
      allowedUpdates.email = updateProfileDto.email;
    }
    return await this.userService.updateProfile(userId, allowedUpdates);
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;
    const user = await this.userService.findByEmail((await this.userService.findOne(userId)).email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('La contraseña actual es incorrecta');

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword)
      throw new BadRequestException('La nueva contraseña debe ser diferente a la actual');

    const hashedPassword: string = await bcrypt.hash(newPassword, 10);

    await this.userService.updatePassword(userId, hashedPassword);

    return { message: 'Contraseña actualizada exitosamente' };
  }

  private async generateAuthResponse(user: User): Promise<AuthResponseDto> {
    const payload = { sub: user.id, email: user.email, name: user.name, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1d',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '30d',
      }),
    ]);

    const userInfo = await this.userService.findOne(user.id);
    return { accessToken, refreshToken, user: userInfo };
  }
}
