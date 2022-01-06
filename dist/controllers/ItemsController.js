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
// import Item from '../models/Item';
const Item_1 = __importDefault(require("../models/Item"));
const ItemView_1 = __importDefault(require("../views/ItemView"));
exports.default = {
    async showAllItemsCity(request, response) {
        const itemsRepository = typeorm_1.getRepository(Item_1.default);
        const { user_id, city } = request.params;
        const items = await itemsRepository.find({
            relations: ['images', 'user_info']
            // ,where: { "user_info.city" :city ,
            ,
            where: { user_info: { city },
                user_id: typeorm_1.Not(user_id) } //Não mostrar items do usuario logado!
        });
        console.log(city, items);
        // return response.status(200).json(ItemsView.renderMany(items));
        return response.status(200).json(items);
    },
    async showAllItemsMinesUsers(request, response) {
        const itemsRepository = typeorm_1.getRepository(Item_1.default);
        const { user_id } = request.params;
        console.log(user_id);
        const items = await itemsRepository.find({
            relations: ['images', 'user_info'],
            where: {
                user_id: typeorm_1.Not(user_id)
            }
        });
        console.log(items);
        return response.status(200).json(ItemView_1.default.renderMany(items));
        // return response.status(200).json(items);
    },
    async showPrices(request, response) {
        const itemsRepository = typeorm_1.getRepository(Item_1.default);
        // const { user_id } = request.params;
        const { price, user_id, city } = request.params;
        const items = await itemsRepository.find({
            relations: ['images', 'user_info'],
            where: { price,
                // user.city,
                user_id: typeorm_1.Not(user_id) }
        });
        console.log(items);
        return response.status(200).json(ItemView_1.default.renderMany(items));
        // return response.status(200).json(items);
    },
    async showUserToItem(request, response) {
        const itemsRepository = typeorm_1.getRepository(Item_1.default);
        const { user_id } = request.params;
        const items = await itemsRepository.find({
            // relations: ['images','user_id']//relacionar para mostrar usuario
            // relations: ['images','user']//relacionar para mostrar usuario
            relations: ['images', 'user_info'] //relacionar para mostrar usuario
            ,
            where: {
                user_id
            }
        });
        console.log(items);
        return response.status(200).json(ItemView_1.default.renderMany(items));
        // return response.status(200).json(items);
    },
    async show(request, response) {
        const itemsRepository = typeorm_1.getRepository(Item_1.default);
        console.log(itemsRepository);
        const items = await itemsRepository.find({
            relations: ['images', 'users'] //relacionar para mostrar usuario
        });
        console.log(items);
        return response.status(200).json(ItemView_1.default.renderMany(items));
        // return response.status(200).json(items);
    },
    async index(request, response) {
        const { item_id } = request.params;
        const itemsRepository = typeorm_1.getRepository(Item_1.default);
        const item = await itemsRepository.findOneOrFail(item_id, {
            relations: ['images', 'users']
        });
        console.log(item);
        return response.status(200).json(ItemView_1.default.render(item));
        // return response.status(200).json(item);
    },
    async create(request, response) {
        const { item_id, name_item, price, description, category, user_id } = request.body;
        const itemsRepository = typeorm_1.getRepository(Item_1.default);
        const requestImages = request.files;
        const images = requestImages.map(image => {
            return { path: image.filename };
        });
        const item = {
            item_id,
            name_item,
            price,
            description,
            category,
            images,
            user_id,
            user_info: user_id,
        };
        const schema = Yup.object().shape({
            name_item: Yup.string().required(),
            price: Yup.string().required(),
            description: Yup.string().required().max(300),
            category: Yup.string().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });
        await schema.validate(item, {
            abortEarly: false,
        });
        const newItem = itemsRepository.create(item);
        await itemsRepository.save(item);
        console.log(response, item, newItem);
        return response.status(201).json(newItem);
    }
};
