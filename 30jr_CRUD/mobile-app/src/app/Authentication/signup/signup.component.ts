import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConnectionService} from '../../_Services/connection.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  private form: FormGroup;
  private mailPat: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private pwdPat: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  private dashboardUrl = '/dashboard/task';

  constructor(private fb: FormBuilder, private router: Router, private connectionService: ConnectionService) { }

  ngOnInit() {
    if (sessionStorage.getItem('auth') !== null) {
      this.router.navigateByUrl(this.dashboardUrl);
    }
    this.form = this.fb.group({
      username : ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.mailPat)])],
      password : ['', Validators.compose([Validators.required, Validators.pattern(this.pwdPat)])],
      newsletter : [false]
    });
  }

  onSignup() {
    const DTO = {email: this.form.controls.username.value, password: this.form.controls.password.value, newsletter: this.form.controls.newsletter.value};
    this.connectionService.signup(DTO).subscribe(response => {
      console.log('response', response)
          if (response !== null && response.aBoolean === true) {
            this.connectionService.authenticated = true;
            this.router.navigateByUrl(this.dashboardUrl);
          } else {
            sessionStorage.setItem('auth', undefined);
            sessionStorage.clear();
            this.form.reset();
            window.alert(response.msg);
          }
        },
        error => {
          sessionStorage.setItem('auth', undefined);
          sessionStorage.clear();
          this.form.reset();
          console.log('error', error);
          window.alert(error.message);
        }
    );
  }
}
