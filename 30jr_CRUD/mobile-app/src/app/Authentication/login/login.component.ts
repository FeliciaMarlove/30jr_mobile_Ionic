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
/**
 * Connexion à l'application.
 */
export class LoginComponent implements OnInit {
  form: FormGroup;
  private dashboardUrl = '/dashboard/task';

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private connectionService: ConnectionService,
      private alertController: AlertController
  ) { }

  /**
   * Vérifie si un utilisateur est déjà connect et navigue vers le tableau de bord si c'est le cas.
   * Instancie un formulaire avec les champs suivants :
   *  username (requis) : l'identifiant
   *  password (requis) : le mot de passe
   */
  ngOnInit() {
    if (sessionStorage.getItem('auth') !== null) {
      this.router.navigateByUrl(this.dashboardUrl);
    }
    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  /**
   * Prépare une fenêtre d'alerte asynchrone.
   * @param msg le texte à afficher
   */
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

  /**
   * Tente une connexion à l'application avec l'identifiant et le mot de passe renseignés dans le formulaire.
   * Vérifie que le rôle est "utilisateur final" :
   *    Définit l'utilisteur comme connecté.
   *    Enregistre l'ID de l'utilisateur dans une variable de session.
   *    Navigue vers le tableau de bord.
   * Nettoie les variables de session et affiche une alerte en cas d'échec de connexion.
   */
  onLogin() {
    const DTO = {email: this.form.controls.username.value, password: this.form.controls.password.value};
    this.connectionService.connect(DTO).subscribe(response => {
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
