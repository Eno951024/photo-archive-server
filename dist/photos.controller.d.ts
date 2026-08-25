import { PhotosService } from './photos.service';
import type { PhotoInput } from './photos.service';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    getPhotos(): Promise<any[]>;
    createPhoto(photo: PhotoInput): Promise<{
        id: string;
        title: string;
        date: string;
        description: string;
        images: string[];
        tags: string[];
    }>;
    updatePhoto(id: string, photo: PhotoInput): Promise<{
        id: string;
        title: string;
        date: string;
        description: string;
        images: string[];
        tags: string[];
    }>;
    deletePhoto(id: string): Promise<{
        success: boolean;
    }>;
    uploadPhoto(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
