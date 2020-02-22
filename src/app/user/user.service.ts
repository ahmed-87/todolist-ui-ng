import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Observable } from 'rxjs';
import User from './user.model';


@Injectable()
class UserService {

    constructor(private http: Http) { }

    host: string = 'http://localhost:8080/user';
    headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    updateUserInfo = (userDetails: User): Observable<any> => {
        return this.http.post(
            `${this.host}/update`
            , userDetails
            , { headers: this.headers }
        );
    };

    // signIn = (userProfile: User) => {
    //     return {
    //         userId: userProfile.userId.toString().substring(8),
    //         firstName : userProfile.getGivenName(),
    //         lastName : userProfile.getFamilyName(),
    //         email : userProfile.getEmail()
    //     }
    // } 
}

export default UserService;
