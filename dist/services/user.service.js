"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// src/services/user.service.ts
const database_1 = __importDefault(require("../config/database"));
const error_middleware_1 = require("../middleware/error.middleware");
class UserService {
    async getProfile(userId) {
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                title: true,
                bio: true,
                githubUrl: true,
                linkedinUrl: true,
                instagramUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new error_middleware_1.AppError(404, 'User not found');
        }
        return user;
    }
    async updateProfile(userId, updateData) {
        const user = await database_1.default.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                title: true,
                bio: true,
                githubUrl: true,
                linkedinUrl: true,
                instagramUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    async getAllUsers() {
        return await database_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                title: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.UserService = UserService;
