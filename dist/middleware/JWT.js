"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { verify } from 'jsonwebtoken';
const jwt = __importStar(require("jsonwebtoken"));
const authConfig_1 = __importDefault(require("../config/authConfig"));
// import AppError from "../errors/Handler";
// import AppError from '../errors/Handler'
function JWT(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({ message: 'JWT Token is missing.' });
    }
    const [type, token] = authHeader.split(' ');
    // const token = authHeader.split(' ')[1];
    try {
        // const decodedToken = verify(token, authConfig.jwt.secret);
        jwt.verify(token, authConfig_1.default.jwt.secret);
        // console.log(decodedToken);
        return next();
    }
    catch (error) {
        return response.status(401).json({ message: 'Invalid JWT Token.' });
    }
}
exports.default = JWT;
