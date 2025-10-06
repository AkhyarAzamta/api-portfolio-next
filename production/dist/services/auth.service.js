"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/services/auth.service.ts
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const error_middleware_1 = require("../middleware/error.middleware");
class AuthService {
    async register(userData) {
        const existingUser = await database_1.default.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new error_middleware_1.AppError(400, 'User already exists');
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(userData.password);
        const user = await database_1.default.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        return { user, token };
    }
    async login(credentials) {
        const user = await database_1.default.user.findUnique({
            where: { email: credentials.email },
        });
        if (!user) {
            throw new error_middleware_1.AppError(401, 'Invalid credentials');
        }
        const isPasswordValid = await (0, bcrypt_1.comparePassword)(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new error_middleware_1.AppError(401, 'Invalid credentials');
        }
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        // Remove password from user object
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}
exports.AuthService = AuthService;
