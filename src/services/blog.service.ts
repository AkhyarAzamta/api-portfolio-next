// src/services/blog.service.ts
import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class BlogService {
  async createBlog(blogData: any, authorId: string) {
    const existingSlug = await prisma.blog.findUnique({
      where: { slug: blogData.slug },
    });

    if (existingSlug) {
      throw new AppError(400, 'Slug already exists');
    }

    const blog = await prisma.blog.create({
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

  async getAllBlogs(page: number = 1, limit: number = 10, published?: boolean) {
    const skip = (page - 1) * limit;

    const where = published !== undefined ? { published } : {};

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
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
      prisma.blog.count({ where }),
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

  async getBlogById(id: string) {
    const blog = await prisma.blog.findUnique({
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
      throw new AppError(404, 'Blog not found');
    }

    // Increment view count
    await prisma.blog.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return blog;
  }

  async getBlogBySlug(slug: string) {
    const blog = await prisma.blog.findUnique({
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
      throw new AppError(404, 'Blog not found');
    }

    // Increment view count
    await prisma.blog.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    });

    return blog;
  }

  async updateBlog(id: string, updateData: any, userId: string, userRole: string) {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new AppError(404, 'Blog not found');
    }

    // Check if user is author or admin
    if (blog.authorId !== userId && userRole !== 'ADMIN') {
      throw new AppError(403, 'Not authorized to update this blog');
    }

    if (updateData.slug && updateData.slug !== blog.slug) {
      const existingSlug = await prisma.blog.findUnique({
        where: { slug: updateData.slug },
      });

      if (existingSlug) {
        throw new AppError(400, 'Slug already exists');
      }
    }

    const updatedBlog = await prisma.blog.update({
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

  async deleteBlog(id: string, userId: string, userRole: string) {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new AppError(404, 'Blog not found');
    }

    // Check if user is author or admin
    if (blog.authorId !== userId && userRole !== 'ADMIN') {
      throw new AppError(403, 'Not authorized to delete this blog');
    }

    await prisma.blog.delete({
      where: { id },
    });

    return { message: 'Blog deleted successfully' };
  }

  async getUserBlogs(userId: string) {
    return await prisma.blog.findMany({
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