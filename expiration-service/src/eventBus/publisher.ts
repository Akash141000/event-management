import { Mq } from "../service/Mq";
import {
  BOOKINGS_EXCHANGE,
  EXPIRED_TICKETS_Q,
  EXPIRED_TICKETS_Q_PATTERN,
  ORDERS_EXCHANGE,
  ORDERS_EXPIRED_Q,
  ORDERS_EXPIRED_Q_PATTERN,
} from "../util/constaints";

export const createPublisher = async () => {
  const mqConnection = Mq.getConnection;
  const channel = await mqConnection.createChannel();

 
  const ticketsQ = await channel.assertQueue(EXPIRED_TICKETS_Q);
  const bookingsExchange = await channel.assertExchange(
    BOOKINGS_EXCHANGE,"direct");

  const ordersQ = await channel.assertQueue(ORDERS_EXPIRED_Q);
  const ordersExchange = await channel.assertExchange(
    ORDERS_EXCHANGE,
    "direct"
  );

  await channel.bindQueue(
    ticketsQ.queue,
    bookingsExchange.exchange,
    EXPIRED_TICKETS_Q_PATTERN
  );

  await channel.bindQueue(
    ordersQ.queue,
    ordersExchange.exchange,
    ORDERS_EXPIRED_Q_PATTERN
  );
};
