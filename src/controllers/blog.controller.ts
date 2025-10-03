// src/controllers/blog.controller.ts
import { Request, Response } from 'express';
import { BlogService } from '../services/blog.service';
import { AuthRequest } from '../models/types';

const blogService = new BlogService();

export class BlogController {
  async createBlog(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const blog = await blogService.createBlog(req.body, authReq.user!.id);
      res.status(201).json(blog);
    } catch (error) {
      throw error;
    }
  }

  async getAllBlogs(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const published = req.query.published as string | undefined;

      const publishedBool = published ? published === 'true' : undefined;

      const result = await blogService.getAllBlogs(page, limit, publishedBool);
      res.json(result);
    } catch (error) {
      throw error;
    }
  }

  async getBlogById(req: Request, res: Response) {
    try {
      const blog = await blogService.getBlogById(req.params.id as string);
      res.json(blog);
    } catch (error) {
      throw error;
    }
  }

  async getBlogBySlug(req: Request, res: Response) {
    try {
      const blog = await blogService.getBlogBySlug(req.params.slug as string);
      res.json(blog);
    } catch (error) {
      throw error;
    }
  }

  async updateBlog(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const blog = await blogService.updateBlog(
        req.params.id as string,
        req.body,
        authReq.user!.id,
        authReq.user!.role
      );
      res.json(blog);
    } catch (error) {
      throw error;
    }
  }

  async deleteBlog(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const result = await blogService.deleteBlog(
        req.params.id as string,
        authReq.user!.id,
        authReq.user!.role
      );
      res.json(result);
    } catch (error) {
      throw error;
    }
  }

  async getUserBlogs(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const blogs = await blogService.getUserBlogs(authReq.user!.id);
      res.json(blogs);
    } catch (error) {
      throw error;
    }
  }
}