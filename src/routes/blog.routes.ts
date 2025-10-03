// src/routes/blog.routes.ts
import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { blogSchema } from '../utils/validation';

const router = Router();
const blogController = new BlogController();

router.get('/', blogController.getAllBlogs);
router.get('/user', authenticate, blogController.getUserBlogs);
router.get('/:id', blogController.getBlogById);
router.get('/slug/:slug', blogController.getBlogBySlug);

// Protected routes
router.post('/', authenticate, validate(blogSchema), blogController.createBlog);
router.put('/:id', authenticate, validate(blogSchema), blogController.updateBlog);
router.delete('/:id', authenticate, blogController.deleteBlog);

// Admin only routes
router.get('/admin/all', authenticate, authorize('ADMIN'), blogController.getAllBlogs);

export default router;