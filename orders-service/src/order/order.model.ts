import {Column, Entity,PrimaryGeneratedColumn} from "typeorm";

export enum paymentStatus{
    success="success",
    processing="processing",
    fail="fail",
}


@Entity()
export class Order{

    @PrimaryGeneratedColumn()
    orderId:number

    @Column({nullable:true})
    paymentId:string;

    @Column()
    ticketId:string;


    @Column()
    userId:string;
    
    @Column()
    eventId:string;

    @Column({default:paymentStatus.processing})
    status:paymentStatus

}