import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Destiny } from '../destinies/entities/destiny.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterReviewDto } from './dto/filter-review.dto';

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

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
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

    return this.reviewRepository.save(review);
  }

  async findAll(filters: FilterReviewDto) {
    const {
      authorId,
      destinyId,
      minRating,
      maxRating,
      page = 1,
      limit = 10,
      order = 'DESC',
    } = filters;

    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.author', 'author')
      .leftJoinAndSelect('review.destiny', 'destiny')
      .select([
        'review.id',
        'review.content',
        'review.rating',
        'review.createdAt',
        'author.id',
        'author.name',
        'destiny.id',
        'destiny.name',
      ]);

    if (authorId) {
      queryBuilder.andWhere('author.id = :authorId', { authorId });
    }

    if (destinyId) {
      queryBuilder.andWhere('destiny.id = :destinyId', { destinyId });
    }

    if (minRating !== undefined) {
      queryBuilder.andWhere('review.rating >= :minRating', { minRating });
    }
    if (maxRating !== undefined) {
      queryBuilder.andWhere('review.rating <= :maxRating', { maxRating });
    }

    const total = await queryBuilder.getCount();

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);
    queryBuilder.orderBy('review.createdAt', order === 'ASC' ? 'ASC' : 'DESC');

    const data = await queryBuilder.getMany();

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      result: data,
    };
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['author', 'destiny'],
      select: {
        id: true,
        content: true,
        rating: true,
        createdAt: true,
        author: { id: true, name: true },
        destiny: { id: true, name: true },
      },
    });

    if (!review) {
      throw new NotFoundException(`Review con ID ${id} no encontrado`);
    }

    return review;
  }

  async remove(id: number): Promise<Review> {
    const review = await this.findOne(id);
    return this.reviewRepository.remove(review);
  }
}
