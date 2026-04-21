import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

type Photo = {
  id: string;
  date: string;
  url: string;
};

@Injectable()
export class PhotosService {
  private supabase: any;

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
}