import {Component, Input, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'util-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
/**
 * Fenêtre qui s'affiche par dessus le contenu sans le recouvrir complètement
 */
export class PopoverComponent implements OnInit {
  show: string;

  constructor(private navParams: NavParams) { }

  /**
   * Récupère le contenu passé en paramètre et met à jour l'affichage HTML.
   */
  ngOnInit() {
    this.show = this.navParams.get('content');
  }
}
