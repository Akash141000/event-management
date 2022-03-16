import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organiser{

    @PrimaryGeneratedColumn()
    organiserId: number;
  
    @Column()
    name: string;
  
    @Column()
    password: string;
  
    @Column({unique:true})
    email: string;
  
    @Column({default:false})
    isLogged: boolean;


}