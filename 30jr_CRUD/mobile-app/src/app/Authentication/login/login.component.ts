import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ConnectionService} from '../../_Services/connection.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private dashboardUrl = '/dashboard/task';

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
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  async showAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Échec',
      subHeader: msg,
      // message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  onLogin() {
    const DTO = {email: this.form.controls.username.value, password: this.form.controls.password.value};
    console.log(DTO)
    this.connectionService.connect(DTO).subscribe(response => {
          // console.log(response);
          if (response !== null && response.userRole === 'USER') {
            this.connectionService.authenticated = true;
            sessionStorage.setItem('user', response.userId.toString());
            this.router.navigateByUrl(this.dashboardUrl);
          } else {
            /*
            L'utilisateur existe mais ce n'est pas un "user"
             */
            sessionStorage.setItem('auth', undefined);
            sessionStorage.clear();
            this.form.reset();
            this.showAlert('Identifiants incorrects');
          }
        },
        /*
        L'utilisateur ne se trouve pas en base de données OU le mot de passe est incorrect
         */
        error => {
          console.log(error);
          sessionStorage.setItem('auth', undefined);
          sessionStorage.clear();
          this.form.reset();
          this.showAlert('Identifiants incorrects');
        }
    );
  }

}
