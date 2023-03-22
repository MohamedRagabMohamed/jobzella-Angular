import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/authentication-service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private authServ: AuthService) {}

  _postCall<T>(
    source: string,
    body: any,
    contentTypeJson: boolean = true
  ): Observable<T> {
    let token = this.authServ.currentUserValue.token;
    let headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        this.authServ.currentUserValue.tokenType + ' ' + (token ? token : '')
      );
    if (!contentTypeJson) {
      headers = new HttpHeaders()
        .set('Accept', '*/*')
        .set(
          'Authorization',
          this.authServ.currentUserValue.tokenType + ' ' + (token ? token : '')
        );
    }
    var options = {
      headers: headers,
    };
    return this.http.post(source, body, options).pipe(tap((res: any) => res));
  }

  _putCall<T>(
    source: string,
    body: any,
    contentTypeJson: boolean = true
  ): Observable<T> {
    let token = this.authServ.currentUserValue.token;
    let headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        this.authServ.currentUserValue.tokenType + ' ' + (token ? token : '')
      );
    if (!contentTypeJson) {
      headers = new HttpHeaders()
        .set('Accept', '*/*')
        .set(
          'Authorization',
          this.authServ.currentUserValue.tokenType + ' ' + (token ? token : '')
        );
    }
    var options = {
      headers: headers,
    };
    return this.http.put(source, body, options).pipe(tap((res: any) => res));
  }

  _getCall<T>(source: string): Observable<T> {
    let token = this.authServ.currentUserValue.token;
    let headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        this.authServ.currentUserValue.tokenType + ' ' + (token ? token : '')
      );
    var options = {
      headers: headers,
    };
    return this.http.get(source, options).pipe(tap((res: any) => res));
  }
  _getCallImage(source: string): any {
    let token = this.authServ.currentUserValue.token;
    let headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'image/jpg;charset=UTF-8')
      .set(
        'Authorization',
        this.authServ.currentUserValue.tokenType + ' ' + (token ? token : '')
      );
    var options = {
      headers: headers,
    };
    return this.http.get<any>(source, {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }

  _deleteCall<T>(source: string): Observable<T> {
    let token = this.authServ.currentUserValue.token;
    let headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        this.authServ.currentUserValue.tokenType + ' ' + (token ? token : '')
      );
    var options = {
      headers: headers,
    };
    return this.http.delete(source, options).pipe(tap((res: any) => res));
  }

  getData<T>(source: string): Observable<T> {
    return this.http.get(source).pipe(tap((res: any) => res));
  }
}
