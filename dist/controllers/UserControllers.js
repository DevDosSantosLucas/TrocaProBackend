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
const jsonwebtoken_1 = require("jsonwebtoken");
const authConfig_1 = __importDefault(require("../config/authConfig"));
const bcryptjs_1 = require("bcryptjs");
const User_1 = __importDefault(require("../models/User"));
const UserView_1 = __importDefault(require("../views/UserView"));
exports.default = {
    async show(request, response) {
        const { user_id } = request.params;
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOneOrFail(user_id);
        console.log(user);
        return response.status(200).json(UserView_1.default.render(user));
    },
    async create(request, response) {
        const { user_id, name, password, city, uf, whatsapp, passwordConfirmation } = request.body;
        const UsersRepository = typeorm_1.getRepository(User_1.default);
        const requestImages = request.file.filename;
        console.log(requestImages);
        const user = {
            user_id,
            avatar: requestImages,
            name,
            city,
            uf,
            whatsapp,
            passwordConfirmation,
            password
        };
        const schema = Yup.object().shape({
            avatar: Yup.string(),
            name: Yup.string().required(),
            city: Yup.string().required(),
            uf: Yup.string().required().max(2),
            whatsapp: Yup.number().lessThan(99999999999999),
            password: Yup.string().required().min(6),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        });
        console.log(user);
        await schema.validate(user, {
            abortEarly: false,
        });
        const userExists = await UsersRepository.findOne({ where: { whatsapp } });
        if (userExists) {
            console.log(userExists);
            return response.status(409).json('WhatsApp has already signed up');
        }
        UsersRepository.create(user);
        await UsersRepository.save(user);
        return response.status(201).json({ user });
    },
    async auth(request, response) {
        const { user_id, whatsapp, password } = request.body;
        const user = {
            user_id,
            whatsapp,
            password,
        };
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const users = await usersRepository.findOne({ where: { whatsapp } });
        console.log(users);
        if (!users) {
            return response.status(201).json("Senha ou whatsapp não é valida!");
        }
        const isValidPassword = await bcryptjs_1.compare(password, user.password);
        if (!isValidPassword) {
            return response.status(401).json('password don\'t authenticated');
        }
        const token = jsonwebtoken_1.sign({}, 'secret', {
            // subject: String(user.user_id),
            expiresIn: authConfig_1.default.jwt.expiresIn
        });
        const schema = Yup.object().shape({
            whatsapp: Yup.number().lessThan(99999999999999),
            password: Yup.string().required().min(6),
        });
        console.log(whatsapp);
        await schema.validate(user, {
            abortEarly: false,
        });
        return response.status(201).json([UserView_1.default.render(users), { token }]);
    },
};
