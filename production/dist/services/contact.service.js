"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
// src/services/contact.service.ts
const database_1 = __importDefault(require("../config/database"));
const error_middleware_1 = require("../middleware/error.middleware");
class ContactService {
    async createContactMessage(contactData) {
        const contactMessage = await database_1.default.contactMessage.create({
            data: {
                ...contactData,
            },
        });
        return contactMessage;
    }
    async getAllContactMessages(page = 1, limit = 10, read) {
        const skip = (page - 1) * limit;
        const where = read !== undefined ? { read } : {};
        const [messages, total] = await Promise.all([
            database_1.default.contactMessage.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            database_1.default.contactMessage.count({ where }),
        ]);
        return {
            messages,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getContactMessageById(id) {
        const message = await database_1.default.contactMessage.findUnique({
            where: { id },
        });
        if (!message) {
            throw new error_middleware_1.AppError(404, 'Contact message not found');
        }
        return message;
    }
    async markAsRead(id) {
        const message = await database_1.default.contactMessage.findUnique({
            where: { id },
        });
        if (!message) {
            throw new error_middleware_1.AppError(404, 'Contact message not found');
        }
        const updatedMessage = await database_1.default.contactMessage.update({
            where: { id },
            data: { read: true },
        });
        return updatedMessage;
    }
    async markAsUnread(id) {
        const message = await database_1.default.contactMessage.findUnique({
            where: { id },
        });
        if (!message) {
            throw new error_middleware_1.AppError(404, 'Contact message not found');
        }
        const updatedMessage = await database_1.default.contactMessage.update({
            where: { id },
            data: { read: false },
        });
        return updatedMessage;
    }
    async deleteContactMessage(id) {
        const message = await database_1.default.contactMessage.findUnique({
            where: { id },
        });
        if (!message) {
            throw new error_middleware_1.AppError(404, 'Contact message not found');
        }
        await database_1.default.contactMessage.delete({
            where: { id },
        });
        return { message: 'Contact message deleted successfully' };
    }
    async getMessageStats() {
        const [total, read, unread] = await Promise.all([
            database_1.default.contactMessage.count(),
            database_1.default.contactMessage.count({ where: { read: true } }),
            database_1.default.contactMessage.count({ where: { read: false } }),
        ]);
        return {
            total,
            read,
            unread,
        };
    }
}
exports.ContactService = ContactService;
