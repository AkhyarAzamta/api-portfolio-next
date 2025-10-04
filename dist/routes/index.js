"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoutes = exports.projectRoutes = exports.blogRoutes = exports.userRoutes = exports.authRoutes = void 0;
// src/routes/index.ts
var auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_routes_1).default; } });
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
var blog_routes_1 = require("./blog.routes");
Object.defineProperty(exports, "blogRoutes", { enumerable: true, get: function () { return __importDefault(blog_routes_1).default; } });
var project_routes_1 = require("./project.routes");
Object.defineProperty(exports, "projectRoutes", { enumerable: true, get: function () { return __importDefault(project_routes_1).default; } });
var contact_routes_1 = require("./contact.routes");
Object.defineProperty(exports, "contactRoutes", { enumerable: true, get: function () { return __importDefault(contact_routes_1).default; } });
