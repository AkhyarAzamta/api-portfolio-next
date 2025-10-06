"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
// src/services/project.service.ts
const database_1 = __importDefault(require("../config/database"));
const error_middleware_1 = require("../middleware/error.middleware");
class ProjectService {
    async createProject(projectData) {
        const project = await database_1.default.project.create({
            data: {
                ...projectData,
            },
        });
        return project;
    }
    async getAllProjects(page = 1, limit = 10, archived) {
        const skip = (page - 1) * limit;
        const where = archived !== undefined ? { archived } : {};
        const [projects, total] = await Promise.all([
            database_1.default.project.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            database_1.default.project.count({ where }),
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
    async getProjectById(id) {
        const project = await database_1.default.project.findUnique({
            where: { id },
        });
        if (!project) {
            throw new error_middleware_1.AppError(404, 'Project not found');
        }
        return project;
    }
    async updateProject(id, updateData) {
        const project = await database_1.default.project.findUnique({
            where: { id },
        });
        if (!project) {
            throw new error_middleware_1.AppError(404, 'Project not found');
        }
        const updatedProject = await database_1.default.project.update({
            where: { id },
            data: updateData,
        });
        return updatedProject;
    }
    async deleteProject(id) {
        const project = await database_1.default.project.findUnique({
            where: { id },
        });
        if (!project) {
            throw new error_middleware_1.AppError(404, 'Project not found');
        }
        await database_1.default.project.delete({
            where: { id },
        });
        return { message: 'Project deleted successfully' };
    }
    async toggleArchive(id) {
        const project = await database_1.default.project.findUnique({
            where: { id },
        });
        if (!project) {
            throw new error_middleware_1.AppError(404, 'Project not found');
        }
        const updatedProject = await database_1.default.project.update({
            where: { id },
            data: { archived: !project.archived },
        });
        return updatedProject;
    }
}
exports.ProjectService = ProjectService;
