import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../_Models/user';
import {UserService} from '../../_Services/user.service';
import {ConnectionService} from '../../_Services/connection.service';
import {AlertController} from '@ionic/angular';

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
      private connectionService: ConnectionService,
      private alertController: AlertController
  ) {  }

  ngOnInit() {
    this.initPersonal();
  }

  ionViewWillEnter(){
  }

  async showAlert(msg: string) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Information',
      subHeader: msg,
      // message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async confirmAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'confirm-alert',
      header: 'CONFIRMATION',
      message: 'ATTENTION. Cette action est définitive !',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.userService.delete(this.user.userId).subscribe( response => {
              if (response.aBoolean === true) {
                this.showAlert('Votre compte a bien été supprimé');
                this.connectionService.logout();
              }
            });
          }
        }
      ]
    });
    await alert.present();
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
          this.showAlert('Cette adresse e-mail est déjà enregistrée');
        }
      });
    }
  }

  onDelete() {
    if ((Number)(sessionStorage.getItem('user')) === this.user.userId) {
      this.confirmAlert();
    }
  }

  onSend() {
    this.showAlert('Ce bouton permettra bientôt d\'envoyer un message à l\'administrateur');
  }
}
