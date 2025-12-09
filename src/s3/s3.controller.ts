import { Controller } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   // if (!file) {
  //   //   throw new BadRequestException('No file provided');
  //   // }

  //   // console.warn('File received:', {
  //   //   originalname: file.originalname,
  //   //   mimetype: file.mimetype,
  //   //   size: file.size,
  //   // });

  //   // const result = await this.s3Service.uploadFile(file);

  //   // return {
  //   //   message: 'File uploaded successfully',
  //   //   ...result,
  //   // };
  // }
}
