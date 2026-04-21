import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PhotosModule,
  ],
})
export class AppModule {}