"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemView_1 = __importDefault(require("./ItemView"));
exports.default = {
    render(swap) {
        return {
            swap_id: swap.swap_id,
            user_id: swap.user_id,
            item_id: ItemView_1.default.render(swap.item_id),
            targed_item_id: ItemView_1.default.render(swap.targed_item_id),
        };
    },
    renderMany(swaps) {
        return swaps.map(swap => this.render(swap));
    },
};
