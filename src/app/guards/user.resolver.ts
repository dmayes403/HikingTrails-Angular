import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(
        private authService: AuthService,
        public afAuth: AngularFireAuth
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const auth$ = this.afAuth.authState.pipe(
            switchMap(authState => {
                this.authService.authState = authState;
                return of(authState);
            })
        );

        if (auth$) {
            return of(auth$);
        }
    }
}
