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
    if(item) return response.status(201).json("JÁ CLICOU AQUI ! \n POR FAVOR AGUARDE ! ");

    const newSwap = swapRepository.create(swap);
    
    // delete item_id.user_id.password
  
    await swapRepository.save(swap);

    const targedItem =await swapRepository.findOne({where:[{
        'item_id':targed_item_id,
        'targed_item_id':item_id,
    }] });
    if( targedItem){
        console.log('OTIMO!\n VÁ PARA ABA DE NEGOCIAÇÕES PARA FINALIZEM A TROCA')
    return response.status(201).json('OTIMO!\n VÁ PARA ABA DE NEGOCIAÇÕES PARA FINALIZEM A TROCA');

    } 

    console.log(swap)
    console.log(newSwap)

    
    return response.status(201).json("TENTATIVA EM PROCESSO!\n AGUARDE ! ");
    // return response.status(201).json(newSwap);

  }

    async showSwap(request: Request, response: Response){
    
            const { item_id,targed_item_id} = request.params;
            // const [isMatch,setMatch] = useState(false);
            var isMatch=false;

            const swapRepository =getRepository(Swap);
    
      
            const item = await swapRepository.find({ 
              relations: [   "item_id", "targed_item_id",
                     "item_id.images" , "targed_item_id.images",
                        "item_id.user_info", "targed_item_id.user_info"] ,
                where:{
                       targed_item_id,
                       item_id,
                      }  
                }
                
               );
              console.log(item)
              if(!item){
               return response.status(200).json("NADA ENCONTRADO!");

              }
            // return response.status(200).json(SwapView.renderMany(item));
            return response.status(200).json(item);

            }
             
            
    async showMatchSwap(request: Request, response: Response){
    
              const { item_id,targed_item_id} = request.params;
              var isMatch =true
  
              const swapRepository =getRepository(Swap); 
               const itemMatch = await swapRepository.find({
                  where:{
                         'targed_item_id':item_id,
                         'item_id':targed_item_id
                        }  
                  }
                 
                  
                 );
                 console.log(itemMatch.length)
                 if(itemMatch.length ===0  ){
                   
                   isMatch =false;
                   console.log("in:",isMatch)
                  return response.status(200).json(isMatch);   

                 }
                 console.log("out:",isMatch)
               
                
            return response.status(200).json(isMatch);   

    }


    async showSwapUser(request: Request, response: Response){
    
      const { user_id} = request.params;
      const swapRepository =getRepository(Swap);


        const items = await swapRepository.find({ 
          relations: [   "item_id", "targed_item_id",
                 "item_id.images" , "targed_item_id.images",
                    "item_id.user_info", "targed_item_id.user_info"] ,
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

