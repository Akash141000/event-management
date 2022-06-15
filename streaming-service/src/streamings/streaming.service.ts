import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  Client
} from "@microsoft/microsoft-graph-client";
import {
  TokenCredentialAuthenticationProvider
} from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import {
  DeviceCodeCredential
} from "@azure/identity";
import { Streaming } from './streaming.model';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


const tenantId = process.env.OAUTH_TENANTID;
const clientId = process.env.OAUTH_APP_ID;

const credential = new DeviceCodeCredential({tenantId, clientId});
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ['']
});

const client = Client.initWithMiddleware({
  authProvider
  // authProvider
  // Use the authProvider object to create the class.
});



 // {
      //   headers: {
      //     Authorization: `${token}`,
      //   },
      // },

@Injectable()
export class StreamingService {
  constructor(
    @InjectModel(Streaming.name) private streamingModel: Model<Streaming>)
 { }

  // async create(token: string) {
  //   const onlineMeetings = {
  //     subject: 'User Token Live Event',
  //     startDateTime: '2022-03-20T14:00:34.2444915+00:00',
  //     endDateTime: '2022-03-20T15:00:50.2464912+00:00',
  //   };
  //   const response = await client.api(
  //       '/me/onlineMeetings'
  //     ).post(onlineMeetings)
  //   return response;
  // }

  async create(eventId:string){
    const eventLinkStreaming = `eventLink${Math.random()}`
    return this.streamingModel.findByIdAndUpdate(eventId,{
      $set:{
        eventLink:eventLinkStreaming
      }
    })
  }

  async getEvent(eventId:string){
   return this.streamingModel.findById(eventId);
  }

}
