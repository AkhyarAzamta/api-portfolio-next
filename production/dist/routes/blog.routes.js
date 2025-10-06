"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/blog.routes.ts
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const blogController = new blog_controller_1.BlogController();
router.get('/', blogController.getAllBlogs);
router.get('/user', auth_middleware_1.authenticate, blogController.getUserBlogs);
router.get('/:id', blogController.getBlogById);
router.get('/slug/:slug', blogController.getBlogBySlug);
// Protected routes
router.post('/', auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(validation_1.blogSchema), blogController.createBlog);
router.put('/:id', auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(validation_1.blogSchema), blogController.updateBlog);
router.delete('/:id', auth_middleware_1.authenticate, blogController.deleteBlog);
// Admin only routes
router.get('/admin/all', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), blogController.getAllBlogs);
exports.default = router;
