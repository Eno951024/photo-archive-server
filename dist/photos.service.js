"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const STORAGE_BUCKET = 'photo_archive';
let PhotosService = class PhotosService {
    supabase;
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }
    async getPhotos() {
        const { data, error } = await this.supabase
            .from('photos')
            .select('*')
            .order('date', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return (data ?? []);
    }
    async createPhoto(photo) {
        const { data, error } = await this.supabase.from('photos')
            .insert(photo)
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async updatePhoto(id, photo) {
        const { data, error } = await this.supabase.from('photos')
            .update(photo)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async deletePhoto(id) {
        const { data: photo, error: fetchError } = await this.supabase.from('photos')
            .select('images')
            .eq('id', id)
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
            .from('photos')
            .delete()
            .eq('id', id);
        if (deleteError) {
            throw new Error(deleteError.message);
        }
    }
    async uploadPhotoFile(file) {
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
};
exports.PhotosService = PhotosService;
exports.PhotosService = PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PhotosService);
//# sourceMappingURL=photos.service.js.map