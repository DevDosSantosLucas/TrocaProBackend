import { Router } from "express";

import multer from "multer";
import uploadConfig from "../config/upload";

import ItemController from"../controllers/ItemsController"
import TrySwapController from "../controllers/TrySwapController"
import JWT from "../middleware/JWT";

    const routes = Router();
    const upload = multer(uploadConfig);

    // routes.use(JWT);
    

    routes.get('/index/:item_id',  ItemController.index)//,JWT)
          .get('/show',  ItemController.show)//,JWT)

          // .get('/showPrices',  ItemController.showPrices)//,JWT)
          .get('/showPrices/:user_id/:price',  ItemController.showPrices)//,JWT)
          .get('/showAllItemsMinesUsers/:user_id',  ItemController.showAllItemsMinesUsers)//,JWT)showAllItemsMinesUsers
          .get('/showAllItemsCity/:user_id/:city',  ItemController.showAllItemsCity)//,JWT)showAllItemsMinesUsers


          .get('/showUserToItem/:user_id',  ItemController.showUserToItem)//,JWT)


          .post('/create', upload.array('images'), ItemController.create)//,JWT)
          // .put('/update/:item_id', ItemController.update,JWT)
          // .delete('/delete/:item_id', ItemController.delete,JWT)

          .post('/tryswap',TrySwapController.trySwap)//,JWT)
          // .get('/showSwap/:item_id',TrySwapController.showSwap)//,JWT)
          .get('/showSwap/:item_id/:targed_item_id',TrySwapController.showSwap)//,JWT)
          .get('/showMatchSwap/:item_id/:targed_item_id',TrySwapController.showMatchSwap)//,JWT)

          .get('/showSwapUser/:user_id',TrySwapController.showSwapUser)//,JWT)


          // .get('/showSwap/',TrySwapController.showSwap)//,JWT)


        //   .post('/image', upload.array('images'), TrySwapController.create);
    

export default routes;


//  766bb7e4-c431-4a76-9ef8-53b4d00b7ac7 | 40e74bb4-1b81-45ac-a47f-6debefd6f53a 

//  | 40e74bb4-1b81-45ac-a47f-6debefd6f53a | 766bb7e4-c431-4a76-9ef8-53b4d00b7ac7