import {Queue,QueueScheduler,Job,Worker} from "bullmq"

export class BullMq{
    queue:Queue<any,any,string>;
    schedular:QueueScheduler;
    worker:Worker | undefined;
    connection = {connection: {host:process.env.DATABASE_HOST}}


    constructor(queue:string,){
        this.queue = new Queue(queue,this.connection);
        this.schedular = new QueueScheduler(queue,this.connection);
    }

    async createWorker(handler:(msg:Job)=>Promise<boolean>){
        this.worker = new Worker(this.queue.name,async (job:Job)=>{
            const done = await handler(job);
            if (!done) {
              job.isFailed();
            }
            job.isCompleted();
        },this.connection);
    }

}
