// src/services/project.service.ts
import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class ProjectService {
  async createProject(projectData: any) {
    const project = await prisma.project.create({
      data: {
        ...projectData,
      },
    });

    return project;
  }

  async getAllProjects(page: number = 1, limit: number = 10, archived?: boolean) {
    const skip = (page - 1) * limit;

    const where = archived !== undefined ? { archived } : {};

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return {
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getProjectById(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new AppError(404, 'Project not found');
    }

    return project;
  }

  async updateProject(id: string, updateData: any) {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new AppError(404, 'Project not found');
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return updatedProject;
  }

  async deleteProject(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new AppError(404, 'Project not found');
    }

    await prisma.project.delete({
      where: { id },
    });

    return { message: 'Project deleted successfully' };
  }

  async toggleArchive(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new AppError(404, 'Project not found');
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { archived: !project.archived },
    });

    return updatedProject;
  }
}