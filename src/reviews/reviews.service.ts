import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Destiny } from '../destinies/entities/destiny.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Destiny)
    private readonly destinyRepository: Repository<Destiny>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewResponseDto> {
    const { authorId, destinyId, ...rest } = createReviewDto;

    const author = await this.userRepository.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`El autor con ID ${authorId} no existe`);
    }

    const destiny = await this.destinyRepository.findOne({ where: { id: destinyId } });
    if (!destiny) {
      throw new NotFoundException(`El destino con ID ${destinyId} no existe`);
    }

    const review = this.reviewRepository.create({
      ...rest,
      author,
      destiny,
    });

    await this.reviewRepository.save(review);
    return this.findOne(review.id);
  }

  async findByDestiny(destinyId: number): Promise<ReviewResponseDto[]> {
    const destiny = await this.destinyRepository.findOne({ where: { id: destinyId } });
    if (!destiny) {
      throw new NotFoundException(`Destino con ID ${destinyId} no encontrado`);
    }

    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.author', 'author')
      .where('review.destiny_id = :destinyId', { destinyId })
      .orderBy('review.createdAt', 'DESC')
      .getMany();

    return reviews.map(review => ({
      ...review,
      destinyId,
      destiny: undefined,
    })) as ReviewResponseDto[];
  }

  async findOne(id: number): Promise<ReviewResponseDto> {
    if (!id || id <= 0) throw new BadRequestException('ID inválido');

    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['author', 'destiny'],
    });

    if (!review) {
      throw new NotFoundException(`Review con ID ${id} no encontrado`);
    }

    const { destiny, ...rest } = review;
    return {
      ...rest,
      destinyId: destiny.id,
    };
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review con ID ${id} no encontrado`);
    }
    await this.reviewRepository.remove(review);
  }

  async addLike(reviewId: number, userId: number): Promise<any> {
    const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new NotFoundException(`Review con ID ${reviewId} no encontrada`);
    }

    if (review.likedByUsers && review.likedByUsers.includes(userId)) {
      throw new BadRequestException('Ya has dado like a esta reseña');
    }

    const likedByUsers = review.likedByUsers || [];
    likedByUsers.push(userId);

    await this.reviewRepository.update(reviewId, { likedByUsers });
    return { message: 'Like agregado exitosamente', likedByUsers };
  }

  async removeLike(reviewId: number, userId: number): Promise<any> {
    const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new NotFoundException(`Review con ID ${reviewId} no encontrada`);
    }

    if (!review.likedByUsers || !review.likedByUsers.includes(userId)) {
      throw new BadRequestException('No has dado like a esta reseña');
    }

    const likedByUsers = review.likedByUsers.filter(id => id !== userId);

    await this.reviewRepository.update(reviewId, { likedByUsers });
    return { message: 'Like removido exitosamente', likedByUsers };
  }
}
