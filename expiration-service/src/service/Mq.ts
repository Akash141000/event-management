import amqp, { Connection } from "amqplib";

export class Mq {
  private static connection: Connection;

  public static get getConnection() {
    return Mq.connection;
  }

  public static async connect(host: string) {
    Mq.connection = await amqp.connect(host);
  }
}
