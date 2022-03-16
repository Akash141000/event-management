import { Mq } from "../service/Mq";
import { BOOKINGS_EXCHANGE, ORDERS_EXCHANGE, ORDERS_EXPIRED_Q_PATTERN, ORDERS_GENERATE_Q, ORDERS_GENERATE_Q_PATTERN, PROCESSING_TICKETS_Q, PROCESSING_TICKETS_Q_PATTERN } from "../util/constaints";
import { orders_bullMq,tickets_bullMq } from "./consumer-events";

export const createConsumer = async () => {
  const mqConnection = Mq.getConnection;
  const channel = await mqConnection.createChannel();
 
  const ticketsQ = await channel.assertQueue(PROCESSING_TICKETS_Q);
  await channel.bindQueue(PROCESSING_TICKETS_Q,BOOKINGS_EXCHANGE,PROCESSING_TICKETS_Q_PATTERN);
 
  const ordersQ = await channel.assertQueue(ORDERS_GENERATE_Q);
  await channel.bindQueue(ORDERS_GENERATE_Q,ORDERS_EXCHANGE,ORDERS_GENERATE_Q_PATTERN);
 
  channel.consume(ticketsQ.queue, async (msg) => {
    if (!msg) {
      return;
    }
    await tickets_bullMq(msg);
    channel.ack(msg);
  });


  channel.consume(ordersQ.queue,async(msg)=>{
    if(!msg){
      return;
    }
    console.log("msg",msg);
    await orders_bullMq(msg);
    channel.ack(msg);
  });
};
