import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    @Input() notifDay: number;

    constructor(
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
            // can optionally pass data
            /*
            After being dismissed, the data can be read in through the onWillDismiss or onDidDismiss attached to the modal after creation:
              const { data } = await modal.onWillDismiss();
              console.log(data);
             */
        });
    }

}
