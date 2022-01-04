import { Request, Response } from 'express';
import { getRepository, Not } from 'typeorm';
import * as Yup from 'yup';

// import Item from '../models/Item';
import Item from '../models/Item';
import ItemsView from '../views/ItemView';

export default {

  async showAllItemsCity(request: Request, response: Response){
    const itemsRepository = getRepository(Item);
    const { user_id ,city} = request.params;
    const items = await itemsRepository.find({
      relations: ['images','user_info']
      // ,where: { "user_info.city" :city ,
      ,where: { user_info:{city} , //PERTO DISSO   
         user_id: Not(user_id)}//Não mostrar items do usuario logado!
      });

    
    console.log(city,items)
    // return response.status(200).json(ItemsView.renderMany(items));
    return response.status(200).json(items);

  },

  async showAllItemsMinesUsers(request: Request, response: Response){
    const itemsRepository = getRepository(Item);
    const { user_id } = request.params;
    console.log(user_id)
    const items = await itemsRepository.find({
      relations: ['images','user_info']
      ,where: { 
         user_id: Not(user_id)}
      });
    
    console.log(items)
    return response.status(200).json(ItemsView.renderMany(items));
    // return response.status(200).json(items);

  },

  async showPrices(request: Request, response: Response){
    const itemsRepository = getRepository(Item);
    // const { user_id } = request.params;
    const {price,user_id,city} = request.params;

    const items = await itemsRepository.find({
      relations: ['images','user_info']
      ,where: { price,
        // user.city,
         user_id: Not(user_id)}
      });
    
    console.log(items)
    return response.status(200).json(ItemsView.renderMany(items));
    // return response.status(200).json(items);

  },

  async showUserToItem(request: Request, response: Response){
    const itemsRepository = getRepository(Item);
    const { user_id } = request.params;
    const items = await itemsRepository.find({
      // relations: ['images','user_id']//relacionar para mostrar usuario
      // relations: ['images','user']//relacionar para mostrar usuario
      relations: ['images','user_info']//relacionar para mostrar usuario
    ,where: {
      user_id}
    });
    console.log(items)
    return response.status(200).json(ItemsView.renderMany(items));
    // return response.status(200).json(items);

  },
  async show(request: Request, response: Response){
    const itemsRepository = getRepository(Item);
    console.log(itemsRepository)
    const items = await itemsRepository.find({
      relations: ['images','users']//relacionar para mostrar usuario
    });
    console.log(items)
    return response.status(200).json(ItemsView.renderMany(items));
    // return response.status(200).json(items);

  },

  async index(request: Request, response: Response){
    const { item_id } = request.params;
    const itemsRepository = getRepository(Item);

    const item = await itemsRepository.findOneOrFail( item_id, {
      relations: ['images','users']
    } );
    
    console.log(item)
    return response.status(200).json(ItemsView.render(item));
    // return response.status(200).json(item);

  },

  async create(request: Request, response: Response){
    const { item_id , name_item, price, description, category, user_id} = request.body;

    
  
    const itemsRepository =getRepository(Item);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return {path: image.filename}
    })
  
    const item = {
        item_id,
        name_item,
        price,
        description,
        category,
        images,   
        user_id,
        user_info:user_id,
        }

    const schema = Yup.object().shape({
      name_item: Yup.string().required(),
      price: Yup.string().required(),
      description: Yup.string().required().max(300),
      category: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    
    await schema.validate(item, {
      abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
    })

    const newItem = itemsRepository.create(item);
  
    await itemsRepository.save(item);
    console.log(response, item,newItem)
    
    return response.status(201).json(newItem);
  }
}