import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_Models/user';
import {Observable} from 'rxjs';

const URI = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public read(id: number): Observable<User> {
    return this.http.get<User>(URI + id);
  }

  public update(id: number, user: User): Observable<User> {
    return this.http.put<User>(URI + id, user);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<User>(URI + id);
  }
}
