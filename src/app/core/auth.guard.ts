import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Auth } from '../entities/auth';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        console.log(Auth.getToken());

        if (Auth.getToken() && Auth.getToken().token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
