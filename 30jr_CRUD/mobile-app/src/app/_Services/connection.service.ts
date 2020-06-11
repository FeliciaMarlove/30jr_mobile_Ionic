import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_Models/user';
import {Router} from '@angular/router';

const URI = 'http://localhost:8080/connection/';

@Injectable({
    providedIn: 'root'
})
/**
 * Requêtes AJAX vers l'API back-end (URI /connection)
 * Service de connexion
 */
export class ConnectionService {
    authenticated = false;

    constructor(private http: HttpClient, private router: Router) {
    }

    /**
     * Tente une connexion à l'application et enregistre le code Basic 64 dans une variable de session.
     * Définit le code Basic 64.
     * Retourn un Observable de type User.
     * @param user l'utilisateur (e-mail et mot de passe)
     */
    public connect(user: User): Observable<User> {
        sessionStorage.setItem('auth', btoa(user.email + ':' + user.password));
        return this.http.post<User>(URI + 'connect', user);
    }

    /**
     * Crée un utilisateur.
     * Définit le code Basic 64.
     * Retourne un Observable de type any.
     * @param user l'utilisateur (e-mail et mot de passe)
     */
    public signup(user: User): Observable<any> {
        sessionStorage.setItem('auth', btoa(user.email + ':' + user.password));
        return this.http.post<User>(URI + 'signup', user);
    }

    /**
     * Déconnecte l'utilisateur.
     * Nettoie les variables de session.
     * Navigue vers la page d'accueil.
     */
    public logout() {
        this.authenticated = false;
        sessionStorage.setItem('auth', undefined);
        sessionStorage.removeItem('auth');
        sessionStorage.clear();
        this.router.navigateByUrl('/');
    }
}


