import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
/**
 * Container pour les Components du tableau de bord
 * Utilise router-outlet pour afficher dynamiquement l'écran en fonction de l'url
 */
export class DashboardComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {}
}
