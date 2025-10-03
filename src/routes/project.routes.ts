// src/routes/project.routes.ts
import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { projectSchema } from '../utils/validation';

const router = Router();
const projectController = new ProjectController();

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Protected routes (Admin only)
router.post('/', authenticate, authorize('ADMIN'), validate(projectSchema), projectController.createProject);
router.put('/:id', authenticate, authorize('ADMIN'), validate(projectSchema), projectController.updateProject);
router.delete('/:id', authenticate, authorize('ADMIN'), projectController.deleteProject);
router.patch('/:id/archive', authenticate, authorize('ADMIN'), projectController.toggleArchive);

export default router;