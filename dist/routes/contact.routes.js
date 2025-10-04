"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/contact.routes.ts
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const contactController = new contact_controller_1.ContactController();
// Public routes (untuk mengirim pesan)
router.post('/', (0, validation_middleware_1.validate)(validation_1.contactMessageSchema), contactController.createContactMessage);
// Protected routes (Admin only)
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), contactController.getAllContactMessages);
router.get('/stats', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), contactController.getMessageStats);
router.get('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), contactController.getContactMessageById);
router.patch('/:id/read', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), contactController.markAsRead);
router.patch('/:id/unread', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), contactController.markAsUnread);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), contactController.deleteContactMessage);
exports.default = router;
