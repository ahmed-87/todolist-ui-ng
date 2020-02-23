import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'td-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    authMessage = "You can not access this content, please login using \"Login\" button in the top right.";
    ngOnInit(){
        console.log("AUTH on Init function !!!");
    }

}
