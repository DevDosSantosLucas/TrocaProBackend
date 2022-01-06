"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
require("dotenv/config");
const dotenv_1 = __importDefault(require("dotenv"));
// import path from 'path';
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
require("./database/connection");
const routes_1 = __importDefault(require("./routes"));
const Handler_1 = __importDefault(require("./errors/Handler")); //
const port = process.env.PORT || 3333;
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors_1.default());
app.use(routes_1.default);
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(Handler_1.default);
app.listen(port);
