// src/services/user.service.ts
import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
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
      throw new AppError(404, 'User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await prisma.user.update({
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
    return await prisma.user.findMany({
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