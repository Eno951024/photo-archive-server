type Photo = {
    id: string;
    title: string;
    date: string;
    description: string;
    images: string[];
    tags: string[];
};
export type PhotoInput = Omit<Photo, 'id'>;
export declare class PhotosService {
    private supabase;
    constructor();
    getPhotos(): Promise<Photo[]>;
    createPhoto(photo: PhotoInput): Promise<Photo>;
    updatePhoto(id: string, photo: PhotoInput): Promise<Photo>;
    deletePhoto(id: string): Promise<void>;
    uploadPhotoFile(file: Express.Multer.File): Promise<string>;
}
export {};
