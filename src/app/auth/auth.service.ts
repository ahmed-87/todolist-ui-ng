import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import User from '../user/user';
import {  Router } from '@angular/router';

declare const gapi: any;

@Injectable()
class AuthService {

    auth: any = null;
    userProfile: User = new User(0, "", "", "");
    isSignedIn: boolean = false;
    authSubject = new Subject<{ isSignedIn: Boolean, userProfile: User }>();

    constructor(private router: Router) {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: '708740995594-eiel6sb249huk4302gjn3ihiganvt5j3.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(status => (this.onAuthChange(status)));
            });
        });
    }

    // userId: userProfile.getId().substring(8),
    //         firstName : userProfile.getGivenName(),
    //         lastName : userProfile.getFamilyName(),
    //         email : userProfile.getEmail()

    onAuthChange = async (isSignedIn: Boolean) => {
        if (isSignedIn) {
            this.isSignedIn = true;

            let googleUser: any = this.auth.currentUser.get().getBasicProfile();
            this.userProfile = new User(
                googleUser.getId().substring(8),
                googleUser.getGivenName(),
                googleUser.getFamilyName(),
                googleUser.getEmail()
            );
            await this.router.navigate(["/"]);
        } else {
            this.isSignedIn = false;
            this.userProfile = new User(0, "", "", "");
            await this.router.navigate(["/unauth"]);
        }


        this.authSubject.next({
            isSignedIn: this.isSignedIn,
            userProfile: this.userProfile
        });
    }

    signIn = () => {
        this.auth.signIn();
    }

    signOut = () => {
        this.auth.signOut();
    }

    getAuthDate = (): Observable<{ isSignedIn: Boolean, userProfile: User }> => {
        return this.authSubject.asObservable();
    }
    getUserProfile = () => {
        return this.userProfile;
    }

    getIsSignedIn = () => {
        return this.isSignedIn;
    }
}

export default AuthService;