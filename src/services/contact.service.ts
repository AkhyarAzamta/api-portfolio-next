// src/services/contact.service.ts
import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class ContactService {
  async createContactMessage(contactData: any) {
    const contactMessage = await prisma.contactMessage.create({
      data: {
        ...contactData,
      },
    });

    return contactMessage;
  }

  async getAllContactMessages(page: number = 1, limit: number = 10, read?: boolean) {
    const skip = (page - 1) * limit;

    const where = read !== undefined ? { read } : {};

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return {
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getContactMessageById(id: string) {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new AppError(404, 'Contact message not found');
    }

    return message;
  }

  async markAsRead(id: string) {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new AppError(404, 'Contact message not found');
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });

    return updatedMessage;
  }

  async markAsUnread(id: string) {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new AppError(404, 'Contact message not found');
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { read: false },
    });

    return updatedMessage;
  }

  async deleteContactMessage(id: string) {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new AppError(404, 'Contact message not found');
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return { message: 'Contact message deleted successfully' };
  }

  async getMessageStats() {
    const [total, read, unread] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: true } }),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

    return {
      total,
      read,
      unread,
    };
  }
}