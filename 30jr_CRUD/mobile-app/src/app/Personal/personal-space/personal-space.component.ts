import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../_Models/user';
import {UserService} from '../../_Services/user.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.scss'],
})
export class PersonalSpaceComponent implements OnInit {
    private form: FormGroup;
    private user: User;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private userService: UserService
  ) { this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  ngOnInit() {
    console.log('ng On Init')
    // only inits at first load of component???
  }

  ionViewWillEnter(){
    console.log('ion View Will Enter')
    this.userService.read((Number)(sessionStorage.getItem('user'))).subscribe( user => console.log(user));
  }

  onUpdate() {

  }
}
