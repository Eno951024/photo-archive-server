import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { PhotosService } from "./photos.service";
import type { PhotoInput } from "./photos.service";

@Controller("api/photos")
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  async getPhotos(): Promise<any[]> {
    return this.photosService.getPhotos();
  }

  @Post()
  async createPhoto(@Body() photo: PhotoInput) {
    return this.photosService.createPhoto(photo);
  }

  @Patch(":id")
  async updatePhoto(@Param("id") id: string, @Body() photo: PhotoInput) {
    return this.photosService.updatePhoto(id, photo);
  }

  @Delete(":id")
  async deletePhoto(@Param("id") id: string) {
    await this.photosService.deletePhoto(id);
    return { success: true };
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    const url = await this.photosService.uploadPhotoFile(file);
    return { url };
  }
}
