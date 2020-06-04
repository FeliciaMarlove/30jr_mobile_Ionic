import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../_Services/task.service';
import {UserService} from '../../_Services/user.service';
import { User } from 'src/app/_Models/user';
import { Task } from 'src/app/_Models/task';

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
      private userService: UserService
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

  onExpand() {
    // TODO logique pour afficher le task long description dans un "expansion pane"
  }
}
