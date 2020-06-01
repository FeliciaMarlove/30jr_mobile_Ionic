import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_Models/user';

const URI = 'http://localhost:8080/connection/';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    authenticated = false;

    constructor(private http: HttpClient) {
    }

    public connect(user: User): Observable<User> {
        sessionStorage.setItem('auth', btoa(user.email + ':' + user.password));
        return this.http.post<User>(URI + 'connect', user);
    }

    public signup(user: User): Observable<any> {
        return this.http.post<User>(URI + 'signup', user);
    }
}


