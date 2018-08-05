import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Auth } from '../../entities/auth';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
    step = 0;
    max = 7;
    phone = '';

    number1 = '';
    number2 = '';
    number3 = '';
    number4 = '';
    number5 = '';

    et = false;
    countryCode = {
        area_code: "84",
        code: "VN",
        name: "Vietnam"
    };
    minDate = { year: 1800, month: 1, day: 1 };
    countryCodes = [];
    isEmailValidated = false;
    error = '';
    register = {
        provider_id: '46c5aa0a9ccb12579857f4e87fe14afb'​​,
        first_name: ''​​,
        last_name: ''​​,
        email: '',
        password: ''​​,
        birthday: null,
        country_code: 'VN',
        phone: '',
        device_id: ''​​,
        mobile_platform: 'ios',
        mobile_device_model: 'iphone',
        app_version: ''​​,
        custom_fields: []
    };

    @ViewChild('numberRef1') numberRef1: ElementRef;
    @ViewChild('numberRef2') numberRef2: ElementRef;
    @ViewChild('numberRef3') numberRef3: ElementRef;
    @ViewChild('numberRef4') numberRef4: ElementRef;
    @ViewChild('numberRef5') numberRef5: ElementRef;

    constructor(private registerService: RegisterService, private router: Router, private sharedService: SharedService) {
        registerService.getCountryCode().subscribe(codes => {
            if (codes['country_codes']) {
                this.countryCodes = codes['country_codes'];
            }
        })
    }

    ngOnInit() {
    }

    next() {
        if (this.step == 4) {
            this.registerService.getActivationCode(this.countryCode['code'], this.phone).subscribe(res => {
                this.numberRef1.nativeElement.focus();
                console.log(res);
            });

            this.register.phone = this.countryCode.area_code + (this.phone.charAt(0) == '0' ? this.phone.slice(1, this.phone.length) : this.phone);
        }

        if (this.step == 5) {
            let data = {
                country_code: this.countryCode.code,
                phone: this.phone​,
                activation_code: "54545"
            }
            this.registerService.verifyActivationCode(data).subscribe(res => {
                console.log(res);
            })
        }
        if (this.step == this.max) {
            let birthday = `${this.register.birthday.year}-${this.register.birthday.month > 10 ? this.register.birthday.month : '0' + this.register.birthday.month}-${this.register.birthday.day > 10 ? this.register.birthday.day : '0' + this.register.birthday.day}`;
            this.register.birthday = birthday;
            this.registerService.register(this.register).subscribe(user => {
                if (user.token) {
                    Auth.setToken(user.token);
                    this.sharedService.toggle(user.token);
                    this.router.navigate(['/']);
                } else {
                    this.error = user['message'] + '! Try again';
                }
            })
        } else {
            this.step++;
        }
    }

    previous() {
        if (this.step > 0) {
            this.step--;
        }
    }

    nextFocus1(value) {
        if (this.number1.length > 0) {
            this.number1 = this.number1.charAt(this.number1.length);
        }
        this.numberRef2.nativeElement.focus();
    }

    nextFocus2(value) {
        if (this.number2.length > 0) {
            this.number2 = this.number2.charAt(this.number2.length);
        }
        this.numberRef3.nativeElement.focus();
    }
    nextFocus3(value) {
        if (this.number3.length > 0) {
            this.number3 = this.number3.charAt(this.number3.length);
        }
        this.numberRef4.nativeElement.focus();
    }
    nextFocus4(value) {
        if (this.number4.length > 0) {
            this.number4 = this.number4.charAt(this.number4.length);
        }
        this.numberRef5.nativeElement.focus();
    }

    nextFocus5(value) {
        if (this.number5.length > 0) {
            this.number5 = this.number5.charAt(this.number5.length);
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(String(email).toLowerCase());
        this.isEmailValidated = result;
        return result;
    }
}
