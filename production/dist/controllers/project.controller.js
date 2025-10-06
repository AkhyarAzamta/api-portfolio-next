"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_1 = require("../services/project.service");
const projectService = new project_service_1.ProjectService();
class ProjectController {
    async createProject(req, res) {
        try {
            const project = await projectService.createProject(req.body);
            res.status(201).json(project);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllProjects(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const archived = req.query.archived;
            const archivedBool = archived ? archived === 'true' : undefined;
            const result = await projectService.getAllProjects(page, limit, archivedBool);
            res.json(result);
        }
        catch (error) {
            throw error;
        }
    }
    async getProjectById(req, res) {
        try {
            const project = await projectService.getProjectById(req.params.id);
            res.json(project);
        }
        catch (error) {
            throw error;
        }
    }
    async updateProject(req, res) {
        try {
            const project = await projectService.updateProject(req.params.id, req.body);
            res.json(project);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteProject(req, res) {
        try {
            const result = await projectService.deleteProject(req.params.id);
            res.json(result);
        }
        catch (error) {
            throw error;
        }
    }
    async toggleArchive(req, res) {
        try {
            const project = await projectService.toggleArchive(req.params.id);
            res.json(project);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProjectController = ProjectController;
