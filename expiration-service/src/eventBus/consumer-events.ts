
import { ConsumeMessage, Replies } from "amqplib";
import { ordersQ, ticketsQ } from "../index";
import { buffToJson } from "../util/helper";

export const tickets_bullMq = async (msg: ConsumeMessage) => {
  const added = ticketsQ.queue.add(
    "tickets",
    { content: buffToJson(msg) },
    { delay: 30000, timestamp: Date.now() }
  );
};


export const orders_bullMq = async (msg: ConsumeMessage) => {
  const added = ordersQ.queue.add(
    "orders",
    { content: buffToJson(msg) },
    { delay: 30000, timestamp: Date.now() }
  );
};
