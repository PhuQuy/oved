import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Auth } from '../entities/auth';

@Injectable({
    providedIn: 'root'
})
export class RegisterService extends BaseService {
    getCountryCode(): Observable<any[]> {
        return this.authHttp
            .post(`${this.apiUrl}`, { request: 'get_country_codes' })
            .pipe(
                map((res) => res),
                catchError(this.handleError)
            );
    }

    getActivationCode(countryCode, phone): Observable<any[]> {
        return this.authHttp
            .post(`${this.apiUrl}`, { country_code: countryCode, phone: phone, request: 'get_phone_activation_code' })
            .pipe(
                map((res) => res),
                catchError(this.handleError)
            );
    }

    verifyActivationCode(body): Observable<any[]> {
        return this.authHttp
            .post(`${this.apiUrl}`, { ...body, request: 'verify_phone_activation_code' })
            .pipe(
                map((res) => res),
                catchError(this.handleError)
            );
    }

    register(body: any): Observable<any> {
        return this.http
            .post(`${this.apiUrl}`, { ...body, request: 'register' })
            .pipe(
                map((res) => res),
                catchError(this.handleError)
            );
    }
}
