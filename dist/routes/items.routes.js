"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const ItemsController_1 = __importDefault(require("../controllers/ItemsController"));
const TrySwapController_1 = __importDefault(require("../controllers/TrySwapController"));
const routes = express_1.Router();
const upload = multer_1.default(upload_1.default);
// routes.use(JWT);
routes.get('/index/:item_id', ItemsController_1.default.index) //,JWT)
    .get('/show', ItemsController_1.default.show) //,JWT)
    // .get('/showPrices',  ItemController.showPrices)//,JWT)
    .get('/showPrices/:user_id/:price', ItemsController_1.default.showPrices) //,JWT)
    .get('/showAllItemsMinesUsers/:user_id', ItemsController_1.default.showAllItemsMinesUsers) //,JWT)showAllItemsMinesUsers
    .get('/showAllItemsCity/:user_id/:city', ItemsController_1.default.showAllItemsCity) //,JWT)showAllItemsMinesUsers
    .get('/showUserToItem/:user_id', ItemsController_1.default.showUserToItem) //,JWT)
    .post('/create', upload.array('images'), ItemsController_1.default.create) //,JWT)
    // .put('/update/:item_id', ItemController.update,JWT)
    // .delete('/delete/:item_id', ItemController.delete,JWT)
    .post('/tryswap', TrySwapController_1.default.trySwap) //,JWT)
    // .get('/showSwap/:item_id',TrySwapController.showSwap)//,JWT)
    .get('/showSwap/:item_id/:targed_item_id', TrySwapController_1.default.showSwap) //,JWT)
    .get('/showMatchSwap/:item_id/:targed_item_id', TrySwapController_1.default.showMatchSwap) //,JWT)
    .get('/showSwapUser/:user_id', TrySwapController_1.default.showSwapUser); //,JWT)
// .get('/showSwap/',TrySwapController.showSwap)//,JWT)
//   .post('/image', upload.array('images'), TrySwapController.create);
exports.default = routes;
//  766bb7e4-c431-4a76-9ef8-53b4d00b7ac7 | 40e74bb4-1b81-45ac-a47f-6debefd6f53a 
//  | 40e74bb4-1b81-45ac-a47f-6debefd6f53a | 766bb7e4-c431-4a76-9ef8-53b4d00b7ac7
