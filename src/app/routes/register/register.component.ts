import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    step = 0;
    max = 7;
    phone = '';
    constructor() { }

    ngOnInit() {
    }

    next() {
        this.step ++;
    }

    previous() {
        this.step --;
    }

}
