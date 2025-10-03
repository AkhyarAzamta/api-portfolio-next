// src/controllers/contact.controller.ts
import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service';

const contactService = new ContactService();

export class ContactController {
  async createContactMessage(req: Request, res: Response) {
    try {
      const contactMessage = await contactService.createContactMessage(req.body);
      res.status(201).json(contactMessage);
    } catch (error) {
      throw error;
    }
  }

  async getAllContactMessages(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const read = req.query.read as string | undefined;

      const readBool = read ? read === 'true' : undefined;

      const result = await contactService.getAllContactMessages(page, limit, readBool);
      res.json(result);
    } catch (error) {
      throw error;
    }
  }

  async getContactMessageById(req: Request, res: Response) {
    try {
      const message = await contactService.getContactMessageById(req.params.id as string);
      res.json(message);
    } catch (error) {
      throw error;
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const message = await contactService.markAsRead(req.params.id as string);
      res.json(message);
    } catch (error) {
      throw error;
    }
  }

  async markAsUnread(req: Request, res: Response) {
    try {
      const message = await contactService.markAsUnread(req.params.id as string);
      res.json(message);
    } catch (error) {
      throw error;
    }
  }

  async deleteContactMessage(req: Request, res: Response) {
    try {
      const result = await contactService.deleteContactMessage(req.params.id as string);
      res.json(result);
    } catch (error) {
      throw error;
    }
  }

  async getMessageStats(req: Request, res: Response) {
    try {
      const stats = await contactService.getMessageStats();
      res.json(stats);
    } catch (error) {
      throw error;
    }
  }
}