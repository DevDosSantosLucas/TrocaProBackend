"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const JWT_1 = __importDefault(require("../middleware/JWT"));
const routes = express_1.Router();
routes.use(JWT_1.default);
routes
    .get('/show/:user_id', UserController_1.default.show, JWT_1.default);
// .put('/update/:userId', UserController.update,JWT)
// .delete('/delete/:userId', UserController.delete,JWT)
// .get('/show/:user_id', UserController.show)
// .put('/update/:userId', UserController.update)
// .delete('/delete/:userId', UserController.delete)
exports.default = routes;
