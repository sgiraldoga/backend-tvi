import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewReply } from './entities/review-reply.entity';
import { User } from '../user/entities/user.entity';
import { Review } from '../reviews/entities/review.entity';
import { CreateReviewReplyDto } from './dto/create-review-reply.dto';
import { ReviewReplyResponseDto } from './dto/review-reply-response.dto';

@Injectable()
export class ReviewReplyService {
  constructor(
    @InjectRepository(ReviewReply)
    private readonly reviewReplyRepository: Repository<ReviewReply>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewReplyDto: CreateReviewReplyDto): Promise<ReviewReplyResponseDto> {
    const { authorId, reviewId, ...rest } = createReviewReplyDto;

    const author = await this.userRepository.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`El autor con ID ${authorId} no existe`);
    }

    const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new NotFoundException(`La reseña con ID ${reviewId} no existe`);
    }

    const reviewReply = this.reviewReplyRepository.create({
      ...rest,
      author,
      review,
    });

    await this.reviewReplyRepository.save(reviewReply);
    return this.findOne(reviewReply.id);
  }

  async findByReview(reviewId: number): Promise<ReviewReplyResponseDto[]> {
    const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new NotFoundException(`Reseña con ID ${reviewId} no encontrada`);
    }

    const replies = await this.reviewReplyRepository
      .createQueryBuilder('reviewReply')
      .leftJoinAndSelect('reviewReply.author', 'author')
      .where('reviewReply.review_id = :reviewId', { reviewId })
      .orderBy('reviewReply.createdAt', 'ASC')
      .getMany();

    return replies.map(reply => ({
      ...reply,
      reviewId,
      review: undefined,
    })) as ReviewReplyResponseDto[];
  }

  async findOne(id: number): Promise<ReviewReplyResponseDto> {
    if (!id || id <= 0) throw new BadRequestException('ID inválido');

    const reviewReply = await this.reviewReplyRepository.findOne({
      where: { id },
      relations: ['author', 'review'],
    });

    if (!reviewReply) {
      throw new NotFoundException(`Respuesta con ID ${id} no encontrada`);
    }

    const { review, ...rest } = reviewReply;
    return {
      ...rest,
      reviewId: review.id,
    };
  }

  async remove(id: number): Promise<void> {
    const reviewReply = await this.reviewReplyRepository.findOne({ where: { id } });
    if (!reviewReply) {
      throw new NotFoundException(`Respuesta con ID ${id} no encontrada`);
    }
    await this.reviewReplyRepository.remove(reviewReply);
  }
}
