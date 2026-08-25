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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const photos_service_1 = require("./photos.service");
let PhotosController = class PhotosController {
    photosService;
    constructor(photosService) {
        this.photosService = photosService;
    }
    async getPhotos() {
        return this.photosService.getPhotos();
    }
    async createPhoto(photo) {
        return this.photosService.createPhoto(photo);
    }
    async updatePhoto(id, photo) {
        return this.photosService.updatePhoto(id, photo);
    }
    async deletePhoto(id) {
        await this.photosService.deletePhoto(id);
        return { success: true };
    }
    async uploadPhoto(file) {
        const url = await this.photosService.uploadPhotoFile(file);
        return { url };
    }
};
exports.PhotosController = PhotosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "getPhotos", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "createPhoto", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "updatePhoto", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "deletePhoto", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "uploadPhoto", null);
exports.PhotosController = PhotosController = __decorate([
    (0, common_1.Controller)('api/photos'),
    __metadata("design:paramtypes", [photos_service_1.PhotosService])
], PhotosController);
//# sourceMappingURL=photos.controller.js.map