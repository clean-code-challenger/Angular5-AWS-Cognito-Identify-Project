import { CUHackitTweetObjectModel } from './../models/cuhackit-tweet-object.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from './../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ComprehendSandboxService {
  private comprehend;

  constructor(private authService: AuthService, private http: HttpClient) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    this.comprehend = new AWS.Comprehend({ region: environment.region, signatureVersion: 'v4', credentials: creds });
  }

  public simpleDetectSentiment(payload: string) {
    const params = {
      LanguageCode: 'en',
      Text: payload, /* required */
    };
    this.comprehend.detectSentiment(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data);
      }
    });
  }

  public getAllNegativeTweets(): Observable<CUHackitTweetObjectModel> {
      const sendResult = new Subject<CUHackitTweetObjectModel>();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json;');
      const httpOptions = {
        headers: headers
      };
      const getUrl = environment.cuhackit.api.get_tweets;
      const getNegativeTweets = this.http.get(getUrl, httpOptions);
      getNegativeTweets.subscribe((result: any) => {
          sendResult.next(result);
      });
      return sendResult.asObservable();
    }
  }
}
