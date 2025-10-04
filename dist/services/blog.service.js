"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
// src/services/blog.service.ts
const database_1 = __importDefault(require("../config/database"));
const error_middleware_1 = require("../middleware/error.middleware");
class BlogService {
    async createBlog(blogData, authorId) {
        const existingSlug = await database_1.default.blog.findUnique({
            where: { slug: blogData.slug },
        });
        if (existingSlug) {
            throw new error_middleware_1.AppError(400, 'Slug already exists');
        }
        const blog = await database_1.default.blog.create({
            data: {
                ...blogData,
                authorId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
        });
        return blog;
    }
    async getAllBlogs(page = 1, limit = 10, published) {
        const skip = (page - 1) * limit;
        const where = published !== undefined ? { published } : {};
        const [blogs, total] = await Promise.all([
            database_1.default.blog.findMany({
                where,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            database_1.default.blog.count({ where }),
        ]);
        return {
            blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getBlogById(id) {
        const blog = await database_1.default.blog.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        bio: true,
                    },
                },
            },
        });
        if (!blog) {
            throw new error_middleware_1.AppError(404, 'Blog not found');
        }
        // Increment view count
        await database_1.default.blog.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
        });
        return blog;
    }
    async getBlogBySlug(slug) {
        const blog = await database_1.default.blog.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        bio: true,
                    },
                },
            },
        });
        if (!blog) {
            throw new error_middleware_1.AppError(404, 'Blog not found');
        }
        // Increment view count
        await database_1.default.blog.update({
            where: { slug },
            data: { viewCount: { increment: 1 } },
        });
        return blog;
    }
    async updateBlog(id, updateData, userId, userRole) {
        const blog = await database_1.default.blog.findUnique({
            where: { id },
        });
        if (!blog) {
            throw new error_middleware_1.AppError(404, 'Blog not found');
        }
        // Check if user is author or admin
        if (blog.authorId !== userId && userRole !== 'ADMIN') {
            throw new error_middleware_1.AppError(403, 'Not authorized to update this blog');
        }
        if (updateData.slug && updateData.slug !== blog.slug) {
            const existingSlug = await database_1.default.blog.findUnique({
                where: { slug: updateData.slug },
            });
            if (existingSlug) {
                throw new error_middleware_1.AppError(400, 'Slug already exists');
            }
        }
        const updatedBlog = await database_1.default.blog.update({
            where: { id },
            data: updateData,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
        });
        return updatedBlog;
    }
    async deleteBlog(id, userId, userRole) {
        const blog = await database_1.default.blog.findUnique({
            where: { id },
        });
        if (!blog) {
            throw new error_middleware_1.AppError(404, 'Blog not found');
        }
        // Check if user is author or admin
        if (blog.authorId !== userId && userRole !== 'ADMIN') {
            throw new error_middleware_1.AppError(403, 'Not authorized to delete this blog');
        }
        await database_1.default.blog.delete({
            where: { id },
        });
        return { message: 'Blog deleted successfully' };
    }
    async getUserBlogs(userId) {
        return await database_1.default.blog.findMany({
            where: { authorId: userId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.BlogService = BlogService;
