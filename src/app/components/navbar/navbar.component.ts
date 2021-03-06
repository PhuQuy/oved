import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Auth } from '../../entities/auth';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModal } from './../modals/register/register.component';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    transparent: boolean;
    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.scrollY > 200) {
            this.transparent = true;
        } else {
            this.transparent = false;
        }
    }
    token;
    constructor(public location: Location, private element: ElementRef, private router: Router, private sharedService: SharedService, private modalService: NgbModal) {
        this.sidebarVisible = false;
        sharedService.change.subscribe(token => {
            if (token) {
                this.token = token
            }
        })
    }

    signUp() {
        this.sidebarClose();
        let windowWidth = window.screen.width;
        if(windowWidth > 768) {
            this.modalService.open(RegisterModal);
        } else {
            this.router.navigate(['/sign-up']);
        }
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    runScroll() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    logout() {
        Auth.setToken(null);
        this.sharedService.toggle(null);
        this.token = null;
        this.sidebarClose();
        this.router.navigate(['/login']);
    }
}
