import { UserPersonal } from './userpersonal.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserPersonalService {
    constructor(private _http: Http) { }
    S_getUserInfo(id: number) {
        return this._http.get('http://localhost:8080/mymovieportal/user/getUser/' + id).map(
            (response: Response) => response.json()
        );
    }
    S_updateUser(userPersonal: UserPersonal, id: number) {
        return this._http.patch('http://localhost:8080/mymovieportal/user/update/' + id, userPersonal).map(
            (response: Response) => response.json()
        );
    }

}
