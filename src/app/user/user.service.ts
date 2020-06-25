import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Observable } from 'rxjs';
import User from './user';


@Injectable()
class UserService {

    constructor(private http: Http) { }

    host: string = 'http://localhost:8383/user';
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
}

export default UserService;
