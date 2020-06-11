import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConnectionService} from '../../_Services/connection.service';

@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
})
/**
 * Container des boutons de déconnexion et accès à l'espace personnel
 */
export class ButtonsComponent implements OnInit {

    constructor(private router: Router, private connectionService: ConnectionService) {
    }

    ngOnInit() {
    }

    /**
     * Déconnecte l'utilisateur.
     */
    onLogout() {
        this.connectionService.logout();
    }

    /**
     * Navigue vers l'espace personnel.
     */
    toPerso() {
        this.router.navigateByUrl('/dashboard/perso');
    }
}
