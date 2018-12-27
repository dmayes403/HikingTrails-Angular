import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-main-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    authState$;
    authState;
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authState$ = this.authService.getAuthState();
    }

    goHome() {
        this.router.navigate(['/home']);
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }
}
