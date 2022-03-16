import { ConsumeMessage } from "amqplib";

// //converts buffer to string
// export const strToBuff = <T extends {content:{msg:{}}}>(content: T): Buffer => {
//   const stringified = JSON.stringify(content.content.msg);
//   return Buffer.from(stringified);
// };

//converts buffer to string
export const strToBuff = <T extends {content:any}>(msg: T): Buffer => {
  const stringified = JSON.stringify(msg.content);
  return Buffer.from(stringified);
};

//converts string to obj
export const buffToJson = <T>(msg: ConsumeMessage): T => {
  const stringified = msg.content.toString();
  return JSON.parse(stringified);
};
