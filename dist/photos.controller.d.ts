import { PhotosService } from './photos.service';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    getPhotos(): Promise<any>;
}
