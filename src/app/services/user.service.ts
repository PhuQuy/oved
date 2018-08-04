import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Auth } from '../entities/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    getUserProfile(): Observable<any[]> {
        return this.authHttp
            .post(`${this.apiUrl}`, {...Auth.getToken(), request: 'get_my_profile' })
            .pipe(
                map((res) => res),
                catchError(this.handleError)
            );
    }
}
