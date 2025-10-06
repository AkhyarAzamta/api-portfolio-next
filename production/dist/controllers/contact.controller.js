"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("../services/contact.service");
const contactService = new contact_service_1.ContactService();
class ContactController {
    async createContactMessage(req, res) {
        try {
            const contactMessage = await contactService.createContactMessage(req.body);
            res.status(201).json(contactMessage);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllContactMessages(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const read = req.query.read;
            const readBool = read ? read === 'true' : undefined;
            const result = await contactService.getAllContactMessages(page, limit, readBool);
            res.json(result);
        }
        catch (error) {
            throw error;
        }
    }
    async getContactMessageById(req, res) {
        try {
            const message = await contactService.getContactMessageById(req.params.id);
            res.json(message);
        }
        catch (error) {
            throw error;
        }
    }
    async markAsRead(req, res) {
        try {
            const message = await contactService.markAsRead(req.params.id);
            res.json(message);
        }
        catch (error) {
            throw error;
        }
    }
    async markAsUnread(req, res) {
        try {
            const message = await contactService.markAsUnread(req.params.id);
            res.json(message);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteContactMessage(req, res) {
        try {
            const result = await contactService.deleteContactMessage(req.params.id);
            res.json(result);
        }
        catch (error) {
            throw error;
        }
    }
    async getMessageStats(req, res) {
        try {
            const stats = await contactService.getMessageStats();
            res.json(stats);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ContactController = ContactController;
