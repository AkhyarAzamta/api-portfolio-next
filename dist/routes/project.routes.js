"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/project.routes.ts
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const projectController = new project_controller_1.ProjectController();
// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
// Protected routes (Admin only)
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validation_middleware_1.validate)(validation_1.projectSchema), projectController.createProject);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validation_middleware_1.validate)(validation_1.projectSchema), projectController.updateProject);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), projectController.deleteProject);
router.patch('/:id/archive', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), projectController.toggleArchive);
exports.default = router;
