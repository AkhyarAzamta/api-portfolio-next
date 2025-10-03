// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../models/types';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      throw error;
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (error) {
      throw error;
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const userService = new (await import('../services/user.service')).UserService();
      const user = await userService.getProfile(authReq.user!.id);
      res.json({ user });
    } catch (error) {
      throw error;
    }
  }
}