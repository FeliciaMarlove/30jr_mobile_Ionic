import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../_Services/task.service';
import {UserService} from '../../_Services/user.service';
import { Task } from 'src/app/_Models/task';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../_Utils/popover/popover.component';

@Component({
  selector: 'app-day-task',
  templateUrl: './day-task.component.html',
  styleUrls: ['./day-task.component.scss'],
})
export class DayTaskComponent implements OnInit {
  private task: Task;
  private hasTask: boolean;
  private noTaskText: string;
  private title: string;

  constructor(
      private router: Router,
      private taskService: TaskService,
      private userService: UserService,
      private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.title = 'DÉFI DU JOUR';
    this.userService.readTaskUser((Number)(sessionStorage.getItem('user'))).subscribe( response => {
      if (response != null) {
        this.task = response;
        this.showTask();
      } else {
        this.showNoTask();
      }
    });
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
