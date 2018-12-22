import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public afAuth: AngularFireAuth
    ) { }

    login() {
        this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()).then(result => {
            console.log(result);
        });
}
