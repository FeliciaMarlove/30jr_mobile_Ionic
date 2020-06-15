import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../_Services/user.service';
import { Task } from 'src/app/_Models/task';
import {ModalController, PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../_Utils/popover/popover.component';
import {NotificationComponent} from '../../Containers/notification/notification.component';

@Component({
  selector: 'app-day-task',
  templateUrl: './day-task.component.html',
  styleUrls: ['./day-task.component.scss'],
})
/**
 * Affichage de la tâche du jour
 */
export class DayTaskComponent implements OnInit {
  task: Task;
  hasTask: boolean;
  noTaskText: string;
  title = 'DÉFI DU JOUR';
  userId: number;

  constructor(
      private router: Router,
      private userService: UserService,
      private popoverController: PopoverController,
      private modalController: ModalController
  ) { }

  /**
   * Récupère l'ID de l'utilisateur connecté.
   * Récupère la tâche du jour de l'utilisateur connecté.
   * Récupère le jour en cours de l'utilisateur connecté et affiche une fenêtre de notification.
   */
  ngOnInit() {
    this.userId = (Number)(sessionStorage.getItem('user'));
  }

  ionViewWillEnter() {
    this.userService.readTaskUser(this.userId).subscribe( response => {
      if (response != null) {
        this.task = response;
        this.showTask();
      } else {
        this.showNoTask();
      }
    });
    this.userService.getDay(this.userId).subscribe( response => {
      // modèle actuel : récupère le numéro du jour en cours -> trigger une notif en fonction du jour (plage) :
      if (response != null) {
        //this.presentModal(response);
      }
    });
  }

  /**
   * Prépare une fenêtre recouvrant tout l'écran asynchrone.
   * @param day le numéro du jour en cours
   */
  async presentModal(day: number) {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'modal',
      componentProps: {
        notifDay: day
      }
    });
    return await modal.present();
  }

  /**
   * Assigne "false" à hasTask
   * Définit la variable notTaskText
   */
  showNoTask() {
    this.noTaskText = 'Sélectionne un parcours pour commencer';
    this.hasTask = false;
  }

  /**
   * Assigne "true" à hasTask
   */
  showTask() {
    this.hasTask = true;
  }

  /**
   * Prépare une fenêtre pop-over pour afficher la description longue de la tâche.
   * @param ev l'événement qui provoque l'apparition
   */
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      // component where the template is :
      component: PopoverComponent,
      // pass parameters to the component :
      componentProps: {content : this.task.taskLongDescription},
      // don't make the backdrop (background behind) grey :
      showBackdrop: false,
      cssClass: 'popover',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
