import { CanDeactivate, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthComponent } from './auth.component';
import AuthService from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanDeactivate<AuthComponent> {

    constructor(private authService: AuthService, private router: Router){}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        return this.authService.getIsSignedIn();
    }
    
    canDeactivate(component: AuthComponent): boolean {
        // if(!this.authService.getIsSignedIn()){
        //      this.router.navigate(["/unauth"]);
        // }
        return this.authService.getIsSignedIn();
    }

}