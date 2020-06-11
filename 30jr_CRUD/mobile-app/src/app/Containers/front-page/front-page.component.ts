import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
/**
 * Container pour les Components de connexion ou inscription
 * Utilise router-outlet pour afficher dynamiquement l'écran en fonction de l'url
 */
export class FrontPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
