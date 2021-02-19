import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { string } from 'yup/lib/locale';

import Swap from '../models/Swap';
import SwapView from '../views/SwapView'

  
class TrySwapController {

    async trySwap(request: Request, response: Response){
     
            
            // const { targed_item_id } = request.params ;//as ItemId ;
             const { user_id,item_id ,targed_item_id} = request.body ;//as ItemId ;
            // const { item_id ,targed_item_id} = request.params ;//as ItemId ;
              

            // console.log(targed_item_id)
            // console.log(item_id)

                   
    
  
    const swapRepository =getRepository(Swap);

    const swap ={
        user_id,
        targed_item_id,
        item_id,
    }

    const item = await swapRepository.findOne({ where: { item_id,targed_item_id} }  );
    if(item) return response.status(201).json("TENTATIVA DE TROCA PARA ESTE PRODUTO JÁ FOI REALIZADA! \n POR FAVOR AGUARDE ! ");

    const newSwap = swapRepository.create(swap);
    
    // delete item_id.user_id.password
  
    await swapRepository.save(swap);

    const targedItem =await swapRepository.findOne({where:[{
        'item_id':targed_item_id,
        'targed_item_id':item_id,
    }] });
    if( targedItem){
        console.log('FULANO TAMBÉM SE INTERESSOU PELO SEU PRODUTO. QUE TAL FINALIZAR UMA TROCA?')
    } 

    console.log(swap)
    console.log(newSwap)

    
    return response.status(201).json("TENTATIVA DE TROCA REALIZA COM SUCESSO!\n AGUARDE ! ");
    // return response.status(201).json(newSwap);

  }

    async showSwap(request: Request, response: Response){
    
            const { item_id,targed_item_id} = request.params;
            const swapRepository =getRepository(Swap);
    
      
              const items = await swapRepository.findOne({ 
                relations: [   "item_id", "targed_item_id",
                       "item_id.images" , "targed_item_id.images",
                       "item_id.user", "targed_item_id.user"] ,
                where:[{
                        'item_id':targed_item_id,
                        'targed_item_id':item_id,
                      }]     
                }
                
               );
              console.log(items)
                
            // return response.status(200).json(SwapView.render(items));
            return response.status(201).json(items);
            

    }


    async showSwapUser(request: Request, response: Response){
    
      const { user_id} = request.params;
      const swapRepository =getRepository(Swap);


        const items = await swapRepository.find({ 
          relations: [   "item_id", "targed_item_id",
                 "item_id.images" , "targed_item_id.images",
                    "item_id.user", "targed_item_id.user"] ,
          where: {user_id} 
          }
          
         );
        
        if(!items){
        return response.status(404).json("NAO TEM NENHUM PRODUTO PARA SER NEGOCIADO!");

        }
   
      // return response.status(200).json(items);
      return response.status(200).json(SwapView.renderMany(items));


      

    }
}

export default new TrySwapController()

