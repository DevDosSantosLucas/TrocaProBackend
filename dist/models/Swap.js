"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Swap_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Item_1 = __importDefault(require("./Item"));
let Swap = Swap_1 = class Swap {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Swap.prototype, "swap_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "user_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => Item_1.default, swaps => Swap_1),
    typeorm_1.JoinColumn({ name: 'item_id' }),
    __metadata("design:type", Item_1.default)
], Swap.prototype, "item_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => Item_1.default, swaps => Swap_1),
    typeorm_1.JoinColumn({ name: 'targed_item_id' }),
    __metadata("design:type", Item_1.default)
], Swap.prototype, "targed_item_id", void 0);
Swap = Swap_1 = __decorate([
    typeorm_1.Entity('swaps')
], Swap);
exports.default = Swap;
