// src/routes/contact.routes.ts
import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { contactMessageSchema } from '../utils/validation';

const router = Router();
const contactController = new ContactController();

// Public routes (untuk mengirim pesan)
router.post('/', validate(contactMessageSchema), contactController.createContactMessage);

// Protected routes (Admin only)
router.get('/', authenticate, authorize('ADMIN'), contactController.getAllContactMessages);
router.get('/stats', authenticate, authorize('ADMIN'), contactController.getMessageStats);
router.get('/:id', authenticate, authorize('ADMIN'), contactController.getContactMessageById);
router.patch('/:id/read', authenticate, authorize('ADMIN'), contactController.markAsRead);
router.patch('/:id/unread', authenticate, authorize('ADMIN'), contactController.markAsUnread);
router.delete('/:id', authenticate, authorize('ADMIN'), contactController.deleteContactMessage);

export default router;