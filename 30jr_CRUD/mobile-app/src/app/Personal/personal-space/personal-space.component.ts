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
/**
 * Gestion des données personnelles de l'utilisateur.
 */
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

  /**
   * Appelle initPersonal()
   */
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.initPersonal();
  }

  /**
   * Prépare une fenêtre d'alerte asynchrone.
   * @param msg le texte à afficher
   */
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

  /**
   * Prépare une fenêtre de confirmation asynchrone pour la suppression du compte utilisateur.
   */
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

  /**
   * Récupère l'utilisateur connecté.
   * Initialise un formulaire réactif contenant les champs suivants :
   *  email (requis, format e-mail), initialisé avec l'e-mail de l'utilisateur
   *  newsletter, initialisé avec l'inscription de l'utilisateur
   */
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

  /**
   * Met à jour l'utilisateur avec les données du formulaire.
   * Vérifie que l'ID de l'utilisateur connecté correspond à l'ID de l'utilisateur en cours de modification.
   * Affiche un message d'erreur en cas d'échec.
   */
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

  /**
   * Supprime un utilisateur.
   * Vérifie que l'ID de l'utilisateur connecté correspond à l'ID de l'utilisateur en cours de modification.
   */
  onDelete() {
    if ((Number)(sessionStorage.getItem('user')) === this.user.userId) {
      this.confirmAlert();
    }
  }

  /*
   * à implémenter : envoi d'e-mails ou de messages via une messagerie, solution à définir
   */
  onSend() {
    this.showAlert('Ce bouton permettra bientôt d\'envoyer un message à l\'administrateur');
  }

  /**
   * Gère la navigation depuis l'espace personnel vers "home"
   * Redirige vers le tableau de bord si l'e-mail n'est pas été modifié
   * Redirige vers la page d'accueil pour une reconnexion si l'e-mail a été modifié
   */
  toHome() {
    if (this.form.controls.email.pristine) {
      this.router.navigateByUrl('/dashboard/task');
    } else {
      this.router.navigateByUrl('');
    }
  }
}
