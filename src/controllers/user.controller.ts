// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../models/types';

const userService = new UserService();

export class UserController {
  async getProfile(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const user = await userService.getProfile(authReq.user!.id);
      res.json({ user });
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const user = await userService.updateProfile(authReq.user!.id, req.body);
      res.json({ user });
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json({ users });
    } catch (error) {
      throw error;
    }
  }
}