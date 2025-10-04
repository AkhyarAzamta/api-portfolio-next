"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validation_1 = require("../utils/validation");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post('/register', (0, validation_middleware_1.validate)(validation_1.registerSchema), authController.register);
router.post('/login', (0, validation_middleware_1.validate)(validation_1.loginSchema), authController.login);
router.get('/me', auth_middleware_1.authenticate, authController.getMe);
exports.default = router;
