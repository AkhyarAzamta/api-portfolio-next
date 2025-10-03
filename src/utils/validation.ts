// src/utils/validation.ts
import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const blogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().optional(),
    slug: z.string().min(1, 'Slug is required'),
    published: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const projectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    technologies: z.array(z.string()).default([]),
    sourceCode: z.string().optional(),
    demoLink: z.string().optional(),
    image: z.string().min(1, 'Image is required'),
    archived: z.boolean().default(false),
    price: z.number().optional(),
    githubLink: z.string().optional(),
    env: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const contactMessageSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
});