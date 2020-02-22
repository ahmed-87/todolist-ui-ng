import { Component, OnInit, ChangeDetectorRef , OnDestroy, AfterViewInit } from '@angular/core';
import AuthService from '../auth/auth.service';
import User from '../user/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'td-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , AfterViewInit, OnDestroy{

  isAuthenticated: Boolean = true;
  userProfile: User;
  fullName: String = "";
  authSubscriber: Subscription;
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }

  handleSignIn = () => {
    this.authService.signIn();
  }

  handleSignOut = () => {
    this.authService.signOut();
  }
  ngOnInit() {
  }
  
  ngAfterViewInit (){
    this.authSubscriber = this.authService.getAuthDate().subscribe((authDate) => {
      const {isSignedIn, userProfile} = authDate;
      this.isAuthenticated = isSignedIn;
      this.userProfile = userProfile;
      this.fullName = `${this.userProfile.firstName} ${this.userProfile.lastName}`;
      this.cdr.detectChanges();
      console.log(authDate);
    });
  }
  
 
  
  ngAfterContentInit() {
    // this.isAuthenticated = this.authService.getIsSignedIn();
    // this.userProfile = this.authService.getUserProfile();
    // this.fullName = `${this.userProfile.firstName} ${this.userProfile.lastName}`;
  }


  ngOnDestroy() {
    this.authSubscriber.unsubscribe();
  }
}
