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
        const headersAuth = {
            headers: new HttpHeaders((user ? {
                authorization: 'Basic ' + btoa(user.email + ':' + user.password)
            } : {}))  };
        sessionStorage.setItem('auth', btoa(user.email + ':' + user.password));
        return this.http.post<User>(URI + 'connect', user, headersAuth);
    }
}


