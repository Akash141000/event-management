export enum statusType {
    available = "available",
    booked = "booked",
    processing = "processing",
  }
  
 export interface ITicket {
        _id?: string;
        userId?: string;
        amount: number;
        status: string | statusType;
  }
  
export  interface IEvent {
        tickets: ITicket[];
  }