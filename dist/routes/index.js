"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const users_routes_1 = __importDefault(require("./users.routes"));
const items_routes_1 = __importDefault(require("./items.routes"));
const routes = express_1.default.Router(); /////
const upload = multer_1.default(upload_1.default);
routes.use("/auth", users_routes_1.default);
routes.use("/items", items_routes_1.default);
routes.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', '..', 'uploads')));
routes
    // .post('/signup',upload.single('avatar'), UserController.create)
    .post('/signup', UserController_1.default.create)
    .post('/session', UserController_1.default.auth);
exports.default = routes;
