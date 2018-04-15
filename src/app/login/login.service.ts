import { Login, Result } from './login.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    constructor(private _http: Http) { }

    S_loginUser(login: Login) {
        return this._http.post('http://localhost:8080/mymovieportal/user/loginChecking', login).map(
            (response: Response) => response.json()
        );
    }

    S_getPassword(email: string) {
        return this._http.get('http://localhost:8080/mymovieportal/user/getPassword/' + email).map(
            (response: Response) => response.json()
        );
    }
    S_sendPassword(password: string) {
        return this._http.get('http://localhost:8080/mymovieportal/mail/passwordmail/' + password).map(
            (response: Response) => response.json)
            ;
    }
}
