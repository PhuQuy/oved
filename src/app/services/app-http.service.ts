import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttp {

  constructor(private http: HttpClient) {
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, this.getHeaderOptions());
  }

  public post(url, data): Observable<any> {
    return this.http.post(url, data, this.getHeaderOptions());
  }

  public put(url, data): Observable<any> {
    return this.http.put(url, data, this.getHeaderOptions());
  }

  public delete(url): Observable<any> {
    return this.http.delete(url, this.getHeaderOptions());
  }

  private getHeaderOptions() {
    const headers = {
      'Content-Type': 'application/json'
    };

    return {
      headers: new HttpHeaders(headers)
    };
  }

}
