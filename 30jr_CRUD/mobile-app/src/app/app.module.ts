import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './Authentication/login/login.component';
import {SignupComponent} from './Authentication/signup/signup.component';
import {DashboardComponent} from './Containers/dashboard/dashboard.component';
import {FrontPageComponent} from './Containers/front-page/front-page.component';
import {HeaderComponent} from './Containers/header/header.component';
import {NotificationComponent} from './Containers/notification/notification.component';
import {ButtonsComponent} from './Navigation/buttons/buttons.component';
import {PathChoiceComponent} from './Path/path-choice/path-choice.component';
import {PathListComponent} from './Path/path-list/path-list.component';
import {PersonalSpaceComponent} from './Personal/personal-space/personal-space.component';
import {DayTaskComponent} from './Task/day-task/day-task.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {XhrInterceptor} from './_Security/xhr-interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        FrontPageComponent,
        HeaderComponent,
        NotificationComponent,
        ButtonsComponent,
        PathChoiceComponent,
        PathListComponent,
        PersonalSpaceComponent,
        DayTaskComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
