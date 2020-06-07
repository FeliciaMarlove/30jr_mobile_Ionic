import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConnectionService} from '../../_Services/connection.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  private form: FormGroup;
  private mailPat: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private pwdPat: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  private dashboardUrl = './../dashboard/task';

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private connectionService: ConnectionService,
      private alertController: AlertController
  ) { }

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

  async showAlert(msg: string) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Échec',
      subHeader: msg,
      // message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  onSignup() {
    const DTO = {email: this.form.controls.username.value, password: this.form.controls.password.value, newsletter: this.form.controls.newsletter.value};
    this.connectionService.signup(DTO).subscribe(response => {
          // console.log('response', response)
          if (response !== null && response.userId) {
            this.connectionService.authenticated = true;
            sessionStorage.setItem('user', response.userId.toString());
            this.router.navigateByUrl('');
          } else {
            sessionStorage.setItem('auth', undefined);
            sessionStorage.clear();
            this.form.reset();
            this.showAlert(response.msg);
          }
        },
        error => {
          sessionStorage.setItem('auth', undefined);
          sessionStorage.clear();
          this.form.reset();
          console.log('error', error);
          this.showAlert(error.message);
        }
    );
  }
}
