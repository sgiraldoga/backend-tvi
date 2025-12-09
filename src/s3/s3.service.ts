import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  // private s3: S3Client;
  // constructor(private readonly configService: ConfigService) {
  //   const region = this.configService.get<string>('AWS_REGION');
  //   const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
  //   const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  //   if (!region || !accessKeyId || !secretAccessKey) {
  //     throw new Error('AWS credentials are not properly configured');
  //   }
  //   this.s3 = new S3Client({
  //     region,
  //     credentials: {
  //       accessKeyId,
  //       secretAccessKey,
  //     },
  //   });
  // }
  // async uploadFile(file: Express.Multer.File) {
  //   const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  //   if (!bucketName) {
  //     throw new Error('AWS S3 bucket name is not configured');
  //   }
  //   const params = {
  //     Bucket: bucketName,
  //     Key: file.originalname, // también puedes generar nombres únicos
  //     Body: file.buffer,
  //     ContentType: file.mimetype,
  //   };
  //   await this.s3.send(new PutObjectCommand(params));
  //   return {
  //     url: `https://${bucketName}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${file.originalname}`,
  //   };
  // }
}
