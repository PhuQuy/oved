import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ AuthService]
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';
    isEmailValidated: boolean = false;
    constructor(private authService: AuthService, private router: Router, private sharedService:SharedService) { }

    ngOnInit() {
    }

    login() {
        this.authService.authenticate({ email: this.email, password: this.password }).subscribe(user => {
            if(user.token) {
                this.sharedService.toggle(user.token);
                this.router.navigate(['/']);
            }
        })
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(String(email).toLowerCase());
        this.isEmailValidated = result;
        return result;
    }

}
