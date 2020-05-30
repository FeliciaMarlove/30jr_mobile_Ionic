import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ConnectionService} from '../../_Services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private connectionService: ConnectionService) { }

  ngOnInit() {
    if (sessionStorage.getItem('auth') !== null) {
      this.router.navigateByUrl('/dashboard/path/read'); //TODO
    }
    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onLogin() {
    const DTO = {email: this.form.controls.username.value, password: this.form.controls.password.value};
    console.log(DTO)
    this.connectionService.connect(DTO).subscribe(response => {
          if (response !== null && response.userRole === 'USER') {
            this.connectionService.authenticated = true;
            this.router.navigateByUrl('/dashboard/path/read'); // TODO
          } else {
            /*
            L'utilisateur existe mais ce n'est pas un "user"
             */
            sessionStorage.setItem('auth', undefined);
            sessionStorage.clear();
            this.form.reset();
            window.alert('Identifiants incorrects');
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
          window.alert('Identifiants incorrects');
        }
    );
  }

}
