import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Photo = {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  tags: string[];
};

export type PhotoInput = Omit<Photo, "id">;

type Database = {
  public: {
    Tables: {
      photos: {
        Row: Photo;
        Insert: PhotoInput;
        Update: Partial<Photo>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

const STORAGE_BUCKET = "photo_archive";

@Injectable()
export class PhotosService {
  private supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );
  }

  async getPhotos(): Promise<Photo[]> {
    const { data, error } = await this.supabase
      .from("photos")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  async createPhoto(photo: PhotoInput): Promise<Photo> {
    const { data, error } = await this.supabase
      .from("photos")
      .insert(photo)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updatePhoto(id: string, photo: PhotoInput): Promise<Photo> {
    const { data, error } = await this.supabase
      .from("photos")
      .update(photo)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async deletePhoto(id: string): Promise<void> {
    const { data: photo, error: fetchError } = await this.supabase
      .from("photos")
      .select("images")
      .eq("id", id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const paths = (photo?.images ?? [])
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
      .from("photos")
      .delete()
      .eq("id", id);

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
