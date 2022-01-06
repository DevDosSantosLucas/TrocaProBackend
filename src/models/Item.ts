import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import Image from './Image';
import Swap from './Swap';
import User from './User';

@Entity('items')
export default class Item {
  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @Column()
  name_item:string;


  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  user_id: string;

  @OneToOne(type=> User,item=> Item)
  // @JoinColumn({name: 'user_info'}) 
  @JoinColumn({name: 'user_info'})  
  // user_id: User;
  user_info: User;


  @OneToOne(type=>Swap, item =>Item)
  @JoinColumn({name:'item_id'})
  swap: Swap;
  

  @OneToMany(()=> Image, image => image.item, {
    cascade:['insert', 'update'] //Irá cadastrar ou atualizar as imagens relacionados a orfanatos cadastrardos
  })
  @JoinColumn({name: 'item_id'})
  images: Image[];

}
