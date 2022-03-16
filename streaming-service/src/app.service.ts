import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import {  Observable } from 'rxjs';

const tenantId = process.env.OAUTH_TENANTID;
const clientId = process.env.OAUTH_APP_ID;

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  create(token: string): Observable<AxiosResponse<any, any>> {
    return this.http
      .post(
        'https://graph.microsoft.com/beta/me/onlineMeetings',
        {
          subject: 'User Token Live Event',
          startDateTime: '2022-03-20T14:00:34.2444915+00:00',
          endDateTime: '2022-03-20T15:00:50.2464912+00:00',
          // isBroadcast: true,
          // broadcastSettings: {
          //   allowedAudience: 'everyone',
          //   isRecordingEnabled: false,
          //   isAttendeeReportEnabled: false,
          // },
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
  }

  errorHandler(error: any) {
    return console.log('error', error);
  }
}
