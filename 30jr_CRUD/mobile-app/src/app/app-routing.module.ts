import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {FrontPageComponent} from './Containers/front-page/front-page.component';
import {LoginComponent} from './Authentication/login/login.component';
import {SignupComponent} from './Authentication/signup/signup.component';
import {DashboardComponent} from './Containers/dashboard/dashboard.component';
import {PathChoiceComponent} from './Path/path-choice/path-choice.component';
import {DayTaskComponent} from './Task/day-task/day-task.component';
import {PersonalSpaceComponent} from './Personal/personal-space/personal-space.component';
import {AuthGuard} from './_Security/auth.guard';

const routes: Routes = [
    { path: '', component: FrontPageComponent, children: [
            {path: '', component: LoginComponent},
            {path: 'signup', component: SignupComponent}
        ]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
            { path: 'path', component: PathChoiceComponent},
            { path: 'task', component: DayTaskComponent},
            { path: 'perso', component: PersonalSpaceComponent}
        ]},
    { path: '**', component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
