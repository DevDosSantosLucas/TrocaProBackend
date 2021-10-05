"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImagesView_1 = __importDefault(require("./ImagesView"));
const UserView_1 = __importDefault(require("./UserView"));
exports.default = {
    render(item) {
        return {
            item_id: item.item_id,
            name_item: item.name_item,
            price: item.price,
            description: item.description,
            category: item.category,
            user_id: item.user_id,
            images: ImagesView_1.default.renderMany(item.images),
            user: UserView_1.default.render(item.user)
        };
    },
    renderMany(items) {
        return items.map(item => this.render(item));
    },
};
