// src/controllers/project.controller.ts
import { Response } from 'express';
import { ProjectService } from '../services/project.service';
import { AuthRequest } from '../models/types';

const projectService = new ProjectService();

export class ProjectController {
  async createProject(req: AuthRequest, res: Response) {
    try {
      const project = await projectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const archived = req.query.archived as string | undefined;

      const archivedBool = archived ? archived === 'true' : undefined;

      const result = await projectService.getAllProjects(page, limit, archivedBool);
      res.json(result);
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(req: AuthRequest, res: Response) {
    try {
      const project = await projectService.getProjectById(req.params.id as string);
      res.json(project);
    } catch (error) {
      throw error;
    }
  }

  async updateProject(req: AuthRequest, res: Response) {
    try {
      const project = await projectService.updateProject(req.params.id as string, req.body);
      res.json(project);
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(req: AuthRequest, res: Response) {
    try {
      const result = await projectService.deleteProject(req.params.id as string);
      res.json(result);
    } catch (error) {
      throw error;
    }
  }

  async toggleArchive(req: AuthRequest, res: Response) {
    try {
      const project = await projectService.toggleArchive(req.params.id as string);
      res.json(project);
    } catch (error) {
      throw error;
    }
  }
}