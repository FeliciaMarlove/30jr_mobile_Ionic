import {Component, Input, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'util-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  private show: string;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.show = this.navParams.get('content');
  }
}
