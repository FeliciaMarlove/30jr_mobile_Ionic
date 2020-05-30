import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FrontPageComponent} from './Containers/front-page/front-page.component';
import {LoginComponent} from './Authentication/login/login.component';
import {SignupComponent} from './Authentication/signup/signup.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent, children : [
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
