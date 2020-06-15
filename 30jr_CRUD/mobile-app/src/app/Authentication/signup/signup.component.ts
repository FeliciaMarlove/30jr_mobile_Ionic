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
/**
 * Création d'un compte utilisateur.
 */
export class SignupComponent implements OnInit {
  form: FormGroup;
  private mailPat: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private pwdPat: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  private dashboardUrl = './../dashboard/task';

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private connectionService: ConnectionService,
      private alertController: AlertController
  ) { }

  /**
   * Vérifie si un utilisateur est déjà connecté et navigue vers le tableau de bord si c'est le cas.
   * Instancie un formulaire avec les champs suivants :
   *  username (requis, format e-amil) : l'identifiant
   *  password (requis, format mot de passe dont les contraintes sont : min. 8 car., au moins 1 Maj. + 1 min. + 1 chiffre + 1 car. spécial) : le mot de passe
   *  newsletter (false) : l'inscription à la newsletter
   */
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

  /**
   * Prépare une fenêtre d'alerte asynchrone.
   * @param msg le texte à afficher
   */
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

  /**
   * Tente la création d'un compte utilisateur avec l'identifiant et le mot de passe renseignés dans le formulaire.
   * En cas de réussite :
   *    Définit l'utilisteur comme connecté.
   *    Enregistre l'ID de l'utilisateur dans une variable de session.
   *    Navigue vers le tableau de bord.
   * Nettoie les variables de session et affiche une alerte en cas d'échec de connexion.
   */
  onSignup() {
    const DTO = {email: this.form.controls.username.value, password: this.form.controls.password.value, newsletter: this.form.controls.newsletter.value};
    this.connectionService.signup(DTO).subscribe(response => {
          if (response !== null && response.userId) {
            this.connectionService.authenticated = true;
            sessionStorage.setItem('user', response.userId.toString());
            this.connectionService.connect(DTO).subscribe( r => {
              this.router.navigateByUrl(this.dashboardUrl);
            });
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
