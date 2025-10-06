"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blog_service_1 = require("../services/blog.service");
const blogService = new blog_service_1.BlogService();
class BlogController {
    async createBlog(req, res) {
        try {
            const authReq = req;
            const blog = await blogService.createBlog(req.body, authReq.user.id);
            res.status(201).json(blog);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllBlogs(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const published = req.query.published;
            const publishedBool = published ? published === 'true' : undefined;
            const result = await blogService.getAllBlogs(page, limit, publishedBool);
            res.json(result);
        }
        catch (error) {
            throw error;
        }
    }
    async getBlogById(req, res) {
        try {
            const blog = await blogService.getBlogById(req.params.id);
            res.json(blog);
        }
        catch (error) {
            throw error;
        }
    }
    async getBlogBySlug(req, res) {
        try {
            const blog = await blogService.getBlogBySlug(req.params.slug);
            res.json(blog);
        }
        catch (error) {
            throw error;
        }
    }
    async updateBlog(req, res) {
        try {
            const authReq = req;
            const blog = await blogService.updateBlog(req.params.id, req.body, authReq.user.id, authReq.user.role);
            res.json(blog);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteBlog(req, res) {
        try {
            const authReq = req;
            const result = await blogService.deleteBlog(req.params.id, authReq.user.id, authReq.user.role);
            res.json(result);
        }
        catch (error) {
            throw error;
        }
    }
    async getUserBlogs(req, res) {
        try {
            const authReq = req;
            const blogs = await blogService.getUserBlogs(authReq.user.id);
            res.json(blogs);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BlogController = BlogController;
