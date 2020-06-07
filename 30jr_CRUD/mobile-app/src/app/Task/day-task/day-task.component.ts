import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../_Services/task.service';
import {UserService} from '../../_Services/user.service';
import { Task } from 'src/app/_Models/task';
import {ModalController, PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../_Utils/popover/popover.component';
import {NotificationComponent} from '../../Containers/notification/notification.component';

@Component({
  selector: 'app-day-task',
  templateUrl: './day-task.component.html',
  styleUrls: ['./day-task.component.scss'],
})
export class DayTaskComponent implements OnInit {
  private task: Task;
  private hasTask: boolean;
  private noTaskText: string;
  private title = 'DÉFI DU JOUR';
  private userId: number;

  constructor(
      private router: Router,
      private userService: UserService,
      private popoverController: PopoverController,
      private modalController: ModalController
  ) { }

  ngOnInit() {
    this.userId = (Number)(sessionStorage.getItem('user'));
    this.userService.readTaskUser(this.userId).subscribe( response => {
      console.log(response)
      if (response != null) {
        this.task = response;
        this.showTask();
      } else {
        this.showNoTask();
      }
    });
    this.userService.getDay(this.userId).subscribe( response => {
      if (response != null) {
        switch (response) {
          case 10 : this.presentModal(10); break;
          case 20 : this.presentModal(20); break;
          case 30 : this.presentModal(30); break;
        }
      }
    });
  }

  async presentModal(day: number) {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'modal',
      componentProps: {
        notifDay: day
      }
    });
    return await modal.present();
  }

  showNoTask() {
    this.noTaskText = 'Sélectionne un parcours pour commencer';
    this.hasTask = false;
  }

  showTask() {
    this.hasTask = true;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      // component where the template is :
      component: PopoverComponent,
      // pass parameters to the component :
      componentProps: {content : this.task.taskLongDescription},
      // don't make the backdrop (background behind) grey :
      showBackdrop: false,
      cssClass: 'popover',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
