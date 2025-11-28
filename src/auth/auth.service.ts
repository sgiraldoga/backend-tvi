import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !(await this.validatePassword(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return { message: 'Login exitoso', userId: user.id };
  }
}
