import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConnectionService} from '../../_Services/connection.service';

@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {

    constructor(private router: Router, private connectionService: ConnectionService) {
    }

    ngOnInit() {
    }

    onLogout() {
        this.connectionService.logout();
    }

    toPerso() {
        console.log('perso');
        this.router.navigateByUrl('/dashboard/perso');
    }

    toPath() {
        console.log('path');

        this.router.navigateByUrl('/dashboard/path');
    }

    toTask() {
        console.log('task');

        this.router.navigateByUrl('/dashboard/task');
    }
}
