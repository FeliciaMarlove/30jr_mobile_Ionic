import {Component, OnInit} from '@angular/core';
import {PopoverComponent} from '../../_Utils/popover/popover.component';
import {ModalController, PopoverController} from '@ionic/angular';
import {Path} from '../../_Models/path';
import {PathService} from '../../_Services/path.service';
import {Router} from '@angular/router';
import {NotificationComponent} from '../../Containers/notification/notification.component';

@Component({
    selector: 'app-path-choice',
    templateUrl: './path-choice.component.html',
    styleUrls: ['./path-choice.component.scss'],
})
/**
 * Choix du parcours.
 */
export class PathChoiceComponent implements OnInit {
    selectedPath: Path;
    paths: Path[];

    constructor(
        private popoverController: PopoverController,
        private pathService: PathService,
        private router: Router,
    ) {
    }

    /**
     * Récupère les parcours.
     */
    ngOnInit() {
        this.pathService.readPaths().subscribe(
            paths => {
                this.paths = paths;
            }
        );
    }

    /**
     * Prépare une fenêtre pop-over pour afficher la description longue du parcours.
     * @param ev l'événement qui provoque l'apparition
     * @param path le parcours sélectionné
     */
    async presentPopover(ev: any, path: Path) {
        const popover = await this.popoverController.create({
            // component where the template is :
            component: PopoverComponent,
            // pass parameters to the component :
            componentProps: {content: path.pathLongDescription},
            // don't make the backdrop (background behind) grey :
            showBackdrop: false,
            cssClass: 'popover',
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    /**
     * Crée une relation utilisateur-parcours.
     * Affiche les logs en cas d'échec.
     * Navigue vers le tableau de bord en cas de réussite.
     */
    onStart() {
        this.pathService.startPath(this.selectedPath.pathId, (Number)(sessionStorage.getItem('user'))).subscribe(response => {
                if (response.msg) {
                    console.log(response.msg);
                } else {
                    this.router.navigateByUrl('/dashboard/task');
                }
            }, error => console.log(error.toString())
        );
    }

    /**
     * Sélectionne un parcours.
     * @param path le parcours sélectionné
     */
    onSelect(path: Path) {
        this.selectedPath = path;
    }
}
