import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_Models/user';
import {Observable} from 'rxjs';

const URI = 'http://localhost:8080/api/user/';
const URI_TASKUSER = 'http://localhost:8080/api/userpath/';

@Injectable({
  providedIn: 'root'
})
/**
 * Requêtes AJAX vers l'API back-end (URI /api/userpath et /api/user)
 * Service utilisateur
 */
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Récupère les données relatives à un utilisateur.
   * Retourne un Observable de type any.
   * @param id l'ID de l'utilisateur
   */
  public read(id: number): Observable<any> {
    return this.http.get<User>(URI + id);
  }

  /**
   * Met à jour un utilisateur.
   * Retourne un Observable de type any.
   * @param id l'ID de l'utilisateur à modifier
   * @param user l'utilisateur à mettre à jour
   */
  public update(id: number, user: User): Observable<any> {
    return this.http.put<User>(URI + id, user);
  }

  /**
   * Supprime un utilisateur.
   * @param id l'ID de l'utilisateur à supprimer.
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<User>(URI + id);
  }

  /**
   * Récupère la tâche du jour de l'utilisateur.
   * @param id l'ID de l'utilisateur
   */
  public readTaskUser(id: number): Observable<any> {
    return this.http.get(URI_TASKUSER + id);
  }

  /**
   * Récupère le jour en cours de l'utilisateur.
   * @param id l'ID de l'utilisateur
   */
  public getDay(id: number): Observable<number> {
    return this.http.get<number>(URI_TASKUSER + id + '/day');
  }
}
