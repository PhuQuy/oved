import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [NgbActiveModal]
})
export class RegisterComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
