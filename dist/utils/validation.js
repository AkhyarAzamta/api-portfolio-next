"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactMessageSchema = exports.projectSchema = exports.blogSchema = exports.loginSchema = exports.registerSchema = void 0;
// src/utils/validation.ts
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(1, 'Password is required'),
    }),
});
exports.blogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        excerpt: zod_1.z.string().min(1, 'Excerpt is required'),
        content: zod_1.z.string().optional(),
        slug: zod_1.z.string().min(1, 'Slug is required'),
        published: zod_1.z.boolean().default(false),
        tags: zod_1.z.array(zod_1.z.string()).default([]),
    }),
});
exports.projectSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        technologies: zod_1.z.array(zod_1.z.string()).default([]),
        sourceCode: zod_1.z.string().optional(),
        demoLink: zod_1.z.string().optional(),
        image: zod_1.z.string().min(1, 'Image is required'),
        archived: zod_1.z.boolean().default(false),
        price: zod_1.z.number().optional(),
        githubLink: zod_1.z.string().optional(),
        env: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
    }),
});
exports.contactMessageSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        email: zod_1.z.string().email('Invalid email address'),
        message: zod_1.z.string().min(10, 'Message must be at least 10 characters'),
    }),
});
