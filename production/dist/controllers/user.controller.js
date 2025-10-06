"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
class UserController {
    async getProfile(req, res) {
        try {
            const authReq = req;
            const user = await userService.getProfile(authReq.user.id);
            res.json({ user });
        }
        catch (error) {
            throw error;
        }
    }
    async updateProfile(req, res) {
        try {
            const authReq = req;
            const user = await userService.updateProfile(authReq.user.id, req.body);
            res.json({ user });
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json({ users });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserController = UserController;
