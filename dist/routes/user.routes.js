"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.get('/profile', auth_middleware_1.authenticate, userController.getProfile);
router.put('/profile', auth_middleware_1.authenticate, userController.updateProfile);
// Admin only routes
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), userController.getAllUsers);
exports.default = router;
