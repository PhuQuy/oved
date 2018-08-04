import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../entities/auth';
import { isObject } from 'util';
import * as moment from 'moment-mini';

@Injectable({
  providedIn: 'root',
})
export class AuthHttp {

  constructor(private http: HttpClient) {
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, this.getHeaderOptions());
  }

  public post(url, data): Observable<any> {
    const convertedData = this.convertDateToServerTimeString(data);
    return this.http.post(url, convertedData, this.getHeaderOptions());
  }

  public put(url, data): Observable<any> {
    const convertedData = this.convertDateToServerTimeString(data);
    return this.http.put(url, convertedData, this.getHeaderOptions());
  }

  public delete(url): Observable<any> {
    return this.http.delete(url, this.getHeaderOptions());
  }

  private getHeaderOptions() {
    const token = Auth.getToken();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}`,
    };

    return {
      headers: new HttpHeaders(headers),
    };
  }

  private convertDateToServerTimeString(data) {
    const convertedData = Object.assign({}, data);

    if (isObject(convertedData)) {
      for (const key in convertedData) {
        if (convertedData.hasOwnProperty(key) && convertedData[key] instanceof Date) {
          convertedData[key] = moment(convertedData[key]).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }

    return convertedData;
  }

}
