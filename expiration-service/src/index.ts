import express from "express";
import { createConsumer } from "./eventBus/consumer";
import { createPublisher } from "./eventBus/publisher";
import { Mq } from "./service/Mq";
import {config} from "dotenv";
import { BullMq } from "./service/BullMq";
import { ORDERS_EXP_Q, TICKETS_EXP_Q } from "./util/constaints";
import { expiredOrdersPublish_expiredQ, expiredTicketsPublish_expiredQ } from "./eventBus/publisher-events";

//
config()
//
const app = express();

//ticketsQ
export const ticketsQ = new BullMq(TICKETS_EXP_Q)
ticketsQ.createWorker(expiredTicketsPublish_expiredQ)

//ordersQ
export const ordersQ = new BullMq(ORDERS_EXP_Q);
ordersQ.createWorker(expiredOrdersPublish_expiredQ )  


const server = app.listen(process.env.PORT, async () => {
  console.log(`Expiration service started on port ${process.env.PORT}`);
   await Mq.connect(process.env.EVENTBUS_URI!);
   await createPublisher();
   await createConsumer();
});

process.on("SIGINT", () => {
  Mq.getConnection.close();
  server.close();
});
