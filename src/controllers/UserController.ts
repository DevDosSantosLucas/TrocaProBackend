import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

// import AppError from "../errors/AppErrors"
// import { sign } from "jsonwebtoken";
import * as  jwt from "jsonwebtoken";

import authConfig from "../config/authConfig"
import bcrypt from "bcryptjs";

import User from '../models/User';

import userView from '../views/UserView';
import { string } from 'yup/lib/locale';



class UserController{ 

  async show(request: Request, response: Response){
  const { user_id } = request.params;
  const usersRepository = getRepository(User);

  const user = await usersRepository.findOneOrFail( {where:{user_id}});
  console.log(user)
  return response.status(200).json(userView.render(user));
  // return response.status(200).json(user);

  }

  async create(request: Request, response: Response){
    const {user_id, name, password, city, uf, whatsapp ,passwordConfirmation} = request.body;
    console.log("Teste:",user_id, name, password, city, uf, whatsapp ,passwordConfirmation);


    const UsersRepository =getRepository(User);
    

    
   // const requestImages = request.file.filename ;
   
    
    

    const passwordHash = await bcrypt.hash(password,10)

    const user = {
      user_id,
      // avatar:requestImages  , 
      avatar: "no Image"  , 
      name,
      city,
      uf,
      whatsapp,
      passwordConfirmation,
      password:passwordHash
    };
    
    const schema = Yup.object().shape({
      avatar: Yup.string(),
      name: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string().required().max(2),
      whatsapp:  Yup.number().lessThan(99999999999999),
      password: Yup.string().required().min(6),
      // passwordConfirmation: Yup.string()
      //  .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    console.log(user)
    
    await schema.validate(user, {
      abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
    })
    const userExists = await UsersRepository.findOne({where:{whatsapp}})
      if(userExists){ 
        
        return response.status(409).json('WhatsApp has already signed up') }

    const createdUser = UsersRepository.create(user);
 
    await UsersRepository.save(createdUser);
    console.log(createdUser)
    return response.status(201).json(createdUser);
  }

  
  async auth(request: Request, response: Response){
  
      const { whatsapp, password } = request.body;
    // const  whatsapp  = await request.body.whatsapp;
    // const  password = await request.body.password;


      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",whatsapp,password)

      const usersRepository = getRepository(User);
      const users = await usersRepository.find({where:{whatsapp} });
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",users)
          
          if(users.length ===1){
          if(await bcrypt.compare(password,users[0].password)){
            console.log("bcrypt")

            //fazer criptografia
      const token = jwt.sign({id: users[0].user_id},
          authConfig.jwt.secret, 
          {expiresIn:authConfig.jwt.expiresIn}   
      );
    

      const user = {
        user_id: users[0].user_id,
        whatsapp: users[0].whatsapp,
        name:users[0].name,
        city:users[0].city,
        uf:users[0].uf,
        token
      }
      console.log(user)
      return response.status(201).json(user);
      }
      else{
        return response.status(400).json("Senha ou whatsapp não é valida!");
      } 
    }
    else {
      return response.status(400).json("Senha ou whatsapp não é valida!");
    } 
  
  }


}
export default new  UserController();