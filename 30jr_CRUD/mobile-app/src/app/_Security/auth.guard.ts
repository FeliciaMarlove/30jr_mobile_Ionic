import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Gestion des routes autorisées en accès direct sans autorisation
 */
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  /**
   * Définit si une route peut être activée
   * Retourne true si un utilisateur est connecté, sinon redirige vers la page de connexion
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('auth') != null) {
      return true;
    } else {
      this.router.navigateByUrl('');
    }
  }
}
