import { Controller, Get } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('api/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  async getPhotos() {
    return this.photosService.getPhotos();
  }
}