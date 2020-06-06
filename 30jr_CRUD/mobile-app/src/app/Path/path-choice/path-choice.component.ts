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
export class PathChoiceComponent implements OnInit {
    private selectedPath: Path;
    private paths: Path[];

    constructor(
        private popoverController: PopoverController,
        private pathService: PathService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.pathService.readPaths().subscribe(
            paths => {
                this.paths = paths;
            }
        );
    }

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

    onSelect(path: Path) {
        this.selectedPath = path;
    }
}
