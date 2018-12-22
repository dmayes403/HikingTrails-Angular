import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-main-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
    }

    goHome() {
        this.router.navigate(['/home']);
    }

    login() {
        this.authService.login();
    }

}
