import Item from "../models/Item";
import Swap from "../models/Swap";
import itemView from './ItemView';
import imagesView from './ImagesView';
import userView from './ImagesView';



export default {
  render(swap: Swap) {
    return{
      swap_id: swap.swap_id,
      user_id: swap.user_id,
      item_id: itemView.render(swap.item_id),
      targed_item_id:itemView.render(swap.targed_item_id)
    };
  },

  renderMany(swaps: Swap[]) {
    return swaps.map(swap => this.render(swap));
  },
}