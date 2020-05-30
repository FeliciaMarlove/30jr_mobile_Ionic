import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConnectionService} from '../../_Services/connection.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  private form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private connectionService: ConnectionService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username : ['', Validators.required, Validators.email],
      password : ['', Validators.required, Validators.pattern('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')]
    });
  }

}
