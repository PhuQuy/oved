import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppHttp } from './app-http.service';
import { AuthHttp } from './auth-http.service';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    protected apiUrl = environment.apiUrl;

    constructor(protected http: AppHttp,
        protected authHttp: AuthHttp) {
    }

    protected handleError(error: any) {
        return throwError(error);
    }
}
