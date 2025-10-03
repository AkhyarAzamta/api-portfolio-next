// src/models/types.ts
import { Request } from 'express';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  avatar?: string;
  title?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  authorId: string;
  slug: string;
  published: boolean;
  viewCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  sourceCode?: string;
  demoLink?: string;
  image: string;
  archived: boolean;
  price?: number;
  githubLink?: string;
  env?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

// Perbaiki AuthRequest untuk extend Express Request
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}