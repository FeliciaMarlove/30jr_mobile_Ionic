import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Path} from '../_Models/path';

const URI = 'http://localhost:8080/api/userpath/';

@Injectable({
    providedIn: 'root'
})
export class PathService {

    constructor(private http: HttpClient) {
    }

    public readPaths(): Observable<Path[]> {
        return this.http.get<any>(URI + 'paths');
    }

  public startPath(pathId: number, userId: number): Observable<any> {
    const DTO = {pathId, userId};
    return this.http.post(URI, DTO);
  }
}
