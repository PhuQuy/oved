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
            let user = localStorage.getItem('user');
            if (user && user != 'x') {
                this.router.navigate(['/login']);
            } else {
                this.router.navigate(['/sign-up']);
            }
            return false;
        }
    }
}
