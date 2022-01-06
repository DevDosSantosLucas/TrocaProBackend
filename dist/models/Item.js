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
var Item_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Image_1 = __importDefault(require("./Image"));
const Swap_1 = __importDefault(require("./Swap"));
const User_1 = __importDefault(require("./User"));
let Item = Item_1 = class Item {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Item.prototype, "item_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Item.prototype, "name_item", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Item.prototype, "price", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Item.prototype, "user_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => User_1.default, item => Item_1)
    // @JoinColumn({name: 'user_info'}) 
    ,
    typeorm_1.JoinColumn({ name: 'user_info' }),
    __metadata("design:type", User_1.default)
], Item.prototype, "user_info", void 0);
__decorate([
    typeorm_1.OneToOne(type => Swap_1.default, item => Item_1),
    typeorm_1.JoinColumn({ name: 'item_id' }),
    __metadata("design:type", Swap_1.default)
], Item.prototype, "swap", void 0);
__decorate([
    typeorm_1.OneToMany(() => Image_1.default, image => image.item, {
        cascade: ['insert', 'update'] //Irá cadastrar ou atualizar as imagens relacionados a orfanatos cadastrardos
    }),
    typeorm_1.JoinColumn({ name: 'item_id' }),
    __metadata("design:type", Array)
], Item.prototype, "images", void 0);
Item = Item_1 = __decorate([
    typeorm_1.Entity('items')
], Item);
exports.default = Item;
