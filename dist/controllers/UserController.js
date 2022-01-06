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
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
// import AppError from "../errors/AppErrors"
// import { sign } from "jsonwebtoken";
const jwt = __importStar(require("jsonwebtoken"));
const authConfig_1 = __importDefault(require("../config/authConfig"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
class UserController {
    async show(request, response) {
        const { user_id } = request.params;
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOneOrFail({ where: { user_id } });
        console.log(user);
        // return response.status(200).json(userView.render(user));
        return response.status(200).json(user);
    }
    async create(request, response) {
        const { user_id, name, password, city, uf, whatsapp, passwordConfirmation } = request.body;
        console.log("Teste:", user_id, name, password, city, uf, whatsapp, passwordConfirmation);
        const UsersRepository = typeorm_1.getRepository(User_1.default);
        // const requestImages = request.file.filename ;
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = {
            user_id,
            // avatar:requestImages  , 
            avatar: "no Image",
            name,
            city,
            uf,
            whatsapp,
            passwordConfirmation,
            password: passwordHash
        };
        const schema = Yup.object().shape({
            avatar: Yup.string(),
            name: Yup.string().required(),
            city: Yup.string().required(),
            uf: Yup.string().required().max(2),
            whatsapp: Yup.number().lessThan(99999999999999),
            password: Yup.string().required().min(6),
        });
        console.log(user);
        await schema.validate(user, {
            abortEarly: false,
        });
        const userExists = await UsersRepository.findOne({ where: { whatsapp } });
        if (userExists) {
            return response.status(409).json('WhatsApp has already signed up');
        }
        const createdUser = UsersRepository.create(user);
        await UsersRepository.save(createdUser);
        console.log(createdUser);
        return response.status(201).json(createdUser);
    }
    async auth(request, response) {
        const { whatsapp, password } = request.body;
        // const  whatsapp  = await request.body.whatsapp;
        // const  password = await request.body.password;
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", whatsapp, password);
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const users = await usersRepository.find({ where: { whatsapp } });
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", users);
        if (users.length === 1) {
            if (await bcryptjs_1.default.compare(password, users[0].password)) {
                console.log("bcrypt");
                //fazer criptografia
                const token = jwt.sign({ id: users[0].user_id }, authConfig_1.default.jwt.secret, { expiresIn: authConfig_1.default.jwt.expiresIn });
                const user = {
                    user_id: users[0].user_id,
                    whatsapp: users[0].whatsapp,
                    name: users[0].name,
                    city: users[0].city,
                    uf: users[0].uf,
                    token
                };
                console.log(user);
                return response.status(201).json(user);
            }
            else {
                return response.status(400).json("Senha ou whatsapp não é valida!");
            }
        }
        else {
            return response.status(400).json("Senha ou whatsapp não é valida!");
        }
    }
}
exports.default = new UserController();
