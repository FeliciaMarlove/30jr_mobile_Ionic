import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../_Services/task.service';

@Component({
  selector: 'app-day-task',
  templateUrl: './day-task.component.html',
  styleUrls: ['./day-task.component.scss'],
})
export class DayTaskComponent implements OnInit {

  constructor(
      private router: Router,
      private taskService: TaskService
  ) { }

  ngOnInit() {
  }

}
