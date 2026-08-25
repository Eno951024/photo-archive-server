import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

type Photo = {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  tags: string[];
};

export type PhotoInput = Omit<Photo, 'id'>;

const STORAGE_BUCKET = 'photo_archive';

@Injectable()
export class PhotosService {
  private supabase: ReturnType<typeof createClient>;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
  }

  async getPhotos(): Promise<Photo[]> {
    const { data, error } = await this.supabase
      .from('photos')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as Photo[];
  }

  async createPhoto(photo: PhotoInput): Promise<Photo> {
    const { data, error } = await (this.supabase.from('photos') as any)
      .insert(photo)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Photo;
  }

  async updatePhoto(id: string, photo: PhotoInput): Promise<Photo> {
    const { data, error } = await (this.supabase.from('photos') as any)
      .update(photo)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Photo;
  }

  async deletePhoto(id: string): Promise<void> {
    const { data: photo, error: fetchError } = await (
      this.supabase.from('photos') as any
    )
      .select('images')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const paths = ((photo?.images ?? []) as string[])
      .map((url) => url.split(`/${STORAGE_BUCKET}/`)[1])
      .filter(Boolean);

    if (paths.length) {
      const { error: storageError } = await this.supabase.storage
        .from(STORAGE_BUCKET)
        .remove(paths);

      if (storageError) {
        throw new Error(storageError.message);
      }
    }

    const { error: deleteError } = await this.supabase
      .from('photos')
      .delete()
      .eq('id', id);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  }

  async uploadPhotoFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}_${encodeURIComponent(file.originalname)}`;

    const { error } = await this.supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = this.supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}