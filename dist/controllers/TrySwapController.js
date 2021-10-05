"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Swap_1 = __importDefault(require("../models/Swap"));
const SwapView_1 = __importDefault(require("../views/SwapView"));
class TrySwapController {
    async trySwap(request, response) {
        // const { targed_item_id } = request.params ;//as ItemId ;
        const { user_id, item_id, targed_item_id } = request.body; //as ItemId ;
        // const { item_id ,targed_item_id} = request.params ;//as ItemId ;
        // console.log(targed_item_id)
        // console.log(item_id)
        const swapRepository = typeorm_1.getRepository(Swap_1.default);
        const swap = {
            user_id,
            targed_item_id,
            item_id,
        };
        const item = await swapRepository.findOne({ where: { item_id, targed_item_id } });
        if (item)
            return response.status(201).json("JÁ CLICOU AQUI ! \n POR FAVOR AGUARDE ! ");
        const newSwap = swapRepository.create(swap);
        // delete item_id.user_id.password
        await swapRepository.save(swap);
        const targedItem = await swapRepository.findOne({ where: [{
                    'item_id': targed_item_id,
                    'targed_item_id': item_id,
                }] });
        if (targedItem) {
            console.log('OTIMO!\n VÁ PARA ABA DE NEGOCIAÇÕES PARA FINALIZEM A TROCA');
            return response.status(201).json('OTIMO!\n VÁ PARA ABA DE NEGOCIAÇÕES PARA FINALIZEM A TROCA');
        }
        console.log(swap);
        console.log(newSwap);
        return response.status(201).json("TENTATIVA EM PROCESSO!\n AGUARDE ! ");
        // return response.status(201).json(newSwap);
    }
    async showSwap(request, response) {
        const { item_id, targed_item_id } = request.params;
        // const [isMatch,setMatch] = useState(false);
        var isMatch = false;
        const swapRepository = typeorm_1.getRepository(Swap_1.default);
        const item = await swapRepository.find({
            relations: ["item_id", "targed_item_id",
                "item_id.images", "targed_item_id.images",
                "item_id.user", "targed_item_id.user"],
            where: {
                targed_item_id,
                item_id,
            }
        });
        console.log(item);
        if (!item) {
            return response.status(200).json("NADA ENCONTRADO!");
        }
        return response.status(200).json(SwapView_1.default.renderMany(item));
    }
    async showMatchSwap(request, response) {
        const { item_id, targed_item_id } = request.params;
        var isMatch = true;
        const swapRepository = typeorm_1.getRepository(Swap_1.default);
        const itemMatch = await swapRepository.find({
            where: {
                'targed_item_id': item_id,
                'item_id': targed_item_id
            }
        });
        console.log(itemMatch.length);
        if (itemMatch.length === 0) {
            isMatch = false;
            console.log("in:", isMatch);
            return response.status(200).json(isMatch);
        }
        console.log("out:", isMatch);
        return response.status(200).json(isMatch);
    }
    async showSwapUser(request, response) {
        const { user_id } = request.params;
        const swapRepository = typeorm_1.getRepository(Swap_1.default);
        const items = await swapRepository.find({
            relations: ["item_id", "targed_item_id",
                "item_id.images", "targed_item_id.images",
                "item_id.user", "targed_item_id.user"],
            where: { user_id }
        });
        if (!items) {
            return response.status(404).json("NAO TEM NENHUM PRODUTO PARA SER NEGOCIADO!");
        }
        // return response.status(200).json(items);
        return response.status(200).json(SwapView_1.default.renderMany(items));
    }
}
exports.default = new TrySwapController();
