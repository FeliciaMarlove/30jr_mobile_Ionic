import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConnectionService} from '../../_Services/connection.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router, private connectionService: ConnectionService) {
    }

    ngOnInit() {
    }

    onLogout() {
    }
}
