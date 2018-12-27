import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

import { from, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authState = null;

    get authenticated() {
        return this.afAuth.auth.currentUser !== null;
    }

    get currentUser() {
        console.log(this.afAuth.authState);
        return this.afAuth.auth.currentUser;
    }

    constructor(
        public afAuth: AngularFireAuth
    ) { }

    login() {
        // from(this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())).subscribe(result => {
        //     console.log(result);
        // });

        from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())).subscribe(result => {
            console.log(result);
            this.authState = result;
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    getAuthState(): Observable<any> {
        return this.afAuth.authState;
    }
}

