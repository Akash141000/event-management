import { Job } from "bullmq";
import { Mq } from "../service/Mq";
import {
  BOOKINGS_EXCHANGE,
  EXPIRED_TICKETS_Q_PATTERN,
  ORDERS_EXCHANGE,
  ORDERS_EXPIRED_Q_PATTERN,
} from "../util/constaints";
import { strToBuff } from "../util/helper";

export const expiredTicketsPublish_expiredQ = async (
  msg: Job
): Promise<boolean> => {
  const mqConnection = Mq.getConnection;
  const channel = await mqConnection.createChannel();
  channel.assertExchange(BOOKINGS_EXCHANGE,'direct');
  const sent = channel.publish(
    BOOKINGS_EXCHANGE,
    EXPIRED_TICKETS_Q_PATTERN,
    strToBuff(msg.data)
  );
  return sent;
};



export const expiredOrdersPublish_expiredQ = async (
  msg: Job
): Promise<boolean> => {
  const mqConnection = Mq.getConnection;
  const channel = await mqConnection.createChannel();
  const sent = channel.publish(
    ORDERS_EXCHANGE,
    ORDERS_EXPIRED_Q_PATTERN,
    strToBuff(msg.data)
  );
  return sent;
};

