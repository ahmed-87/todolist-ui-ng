import { Injectable, NgZone } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import User from '../user/user';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable()
class AuthService {

    auth: any = null;
    userProfile: User = new User(0, "", "", "");
    isSignedIn: boolean = false;
    authSubject = new Subject<{ isSignedIn: boolean, userProfile: User }>();

    constructor(private router: Router, private zone: NgZone) {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: '708740995594-eiel6sb249huk4302gjn3ihiganvt5j3.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                zone.run(() => {
                    this.auth.isSignedIn.listen((status) => (this.onAuthChange(status)));
                });
            });
        });
    }

    onAuthChange = (isSignedIn: boolean) => {
        this.zone.run(() => {
            if (isSignedIn) {
                this.isSignedIn = true;

                let googleUser: any = this.auth.currentUser.get().getBasicProfile();
                this.userProfile = new User(
                    googleUser.getId().substring(8),
                    googleUser.getGivenName(),
                    googleUser.getFamilyName(),
                    googleUser.getEmail()
                );

                if(window.location.pathname.includes("/unauth")){
                    this.router.navigate(["/"]);
                }
            } else {
                this.isSignedIn = false;
                this.userProfile = new User(0, "", "", "");
                this.router.navigate(["/unauth"]);
            }
        })

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

    getAuthDate = (): Observable<{ isSignedIn: boolean, userProfile: User }> => {
        return this.authSubject.asObservable();
    }

    getIsSignedIn = (): boolean => {
        return this.isSignedIn;
    }

    getUserProfile = (): User => {
        return this.userProfile;
    }

    getUserId = (): Number => {
        return this.userProfile.userId;
    }
}

export default AuthService;