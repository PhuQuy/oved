import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Auth } from '../entities/auth';
import { Token } from '../entities/token';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    authenticate(body: any): Observable<Token> {
        return this.http
            .post(`${this.apiUrl}`, { ...body, request: 'login' })
            .pipe(
                map((data) => {
                    if(data.token) {
                        return Auth.setToken(data);
                    } else {
                        return data;
                    }
                }),
                catchError(this.handleError)
            );
    }
}
