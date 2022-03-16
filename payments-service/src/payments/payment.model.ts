import {} from "@nestjs/typeorm";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment{

  @PrimaryColumn({unique:true})
  paymentId:string;

  @Column({unique:true,nullable:false})
  orderId:number;

  @Column()
  amount:number;

  @Column()
  ticketId:string;
}

