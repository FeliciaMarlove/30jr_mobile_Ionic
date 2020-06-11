import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Path} from '../_Models/path';

const URI = 'http://localhost:8080/api/userpath/';

@Injectable({
    providedIn: 'root'
})
/**
 * Requêtes AJAX vers l'API back-end (URI /api/userpath)
 * Service parcours pour l'utilisateur final
 */
export class PathService {

    constructor(private http: HttpClient) {
    }

    /**
     * Récupère tous les parcours.
     * Retourne un Observable de type array de Path
     */
    public readPaths(): Observable<Path[]> {
        return this.http.get<any>(URI + 'paths');
    }

    /**
     * Crée une relation parcours-utilisateur.
     * @param pathId l'ID du parcours
     * @param userId l'ID de l'utilisateur
     */
  public startPath(pathId: number, userId: number): Observable<any> {
    const DTO = {pathId, userId};
    return this.http.post(URI, DTO);
  }
}
