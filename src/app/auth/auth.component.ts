import { Component, OnInit} from '@angular/core';
// import AuthService from '../auth/auth.service';
// import User from '../user/user.model';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'td-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    authMessage = "You can not access this content, please login using \"Log In\" button in the top right.";
    ngOnInit(){
        console.log("AUTH on Init function !!!");
    }

}
