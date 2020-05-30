import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnectionService} from '../../_Services/connection.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {

  constructor(private router: Router, private connectionService: ConnectionService) { }

  ngOnInit() {}

    onLogout() {
      this.connectionService.authenticated = false;
      sessionStorage.setItem('auth', undefined);
      sessionStorage.removeItem('auth');
      sessionStorage.clear();
      this.router.navigateByUrl('/');
    }
}
