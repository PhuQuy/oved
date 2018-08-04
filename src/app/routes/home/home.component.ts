import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [UserService]
})
export class HomeComponent implements OnInit {
    user: any;
    constructor(private userService: UserService) {
        let user = localStorage.getItem('user');
        if (user && user != 'x') {
            this.user = user;
        }
        userService.getUserProfile().subscribe(user => {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        })
    }

    ngOnInit() {
    }

}
