import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../_Models/user';
import {UserService} from '../../_Services/user.service';
import {ConnectionService} from '../../_Services/connection.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.scss'],
})
export class PersonalSpaceComponent implements OnInit {
    private form: FormGroup;
    private user: User;
    private mailPat: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private success: boolean;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private userService: UserService,
      private connectionService: ConnectionService
  ) {  }

  ngOnInit() {
    this.initPersonal();
  }

  ionViewWillEnter(){
  }

  initPersonal() {
    this.userService.read((Number)(sessionStorage.getItem('user'))).subscribe( user => {
      this.user = user;
      if ((Number)(sessionStorage.getItem('user')) === this.user.userId) {
        this.form = this.fb.group({
          email: [this.user?.email, Validators.compose([Validators.required, Validators.email, Validators.pattern(this.mailPat)])],
          newsletter: [this.user?.newsletter]
        });
      }
    });
  }

  onUpdate() {
    if ((Number)(sessionStorage.getItem('user')) === this.user.userId) {
      this.userService.update(this.user.userId, this.form.value).subscribe(response => {
        if (response != null && response.userId) {
          this.success = true;
        } else {
          console.log(response.msg);
        }
      });
    }
  }

  onDelete() {
    if ((Number)(sessionStorage.getItem('user')) === this.user.userId) {
      this.userService.delete(this.user.userId).subscribe( response => {
        if (response.aBoolean === true) {
          this.connectionService.logout();
        }
      });
    }
  }
}
