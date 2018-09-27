import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddTurnoPage } from '../pages/add-turno/add-turno';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { LoginPage  } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as $ from 'jquery'; // For Angular 6
import {CalendarModule} from "ap-angular-fullcalendar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompletePacienteServiceProvider } from '../providers/autocomplete-paciente-service/autocomplete-paciente-service';
import { AutocompleteObrasocialServiceProvider } from '../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { AutocompleteProvinciaProvider } from '../providers/autocomplete-provincia/autocomplete-provincia';
import { AutocompleteLocalidadProvider } from '../providers/autocomplete-localidad/autocomplete-localidad';
import { TurnosServiceProvider } from '../providers/turnos-service/turnos-service';
import { IonicPageModule } from "ionic-angular";
import { PacienteServiceProvider } from '../providers/paciente-service/paciente-service';
import { DniValidator  } from '../validators/dni.validator';
import { UserValidator } from '../validators/user.validator';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
//import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ProfesionalesProvider } from '../providers/profesionales/profesionales-service';
import { SeguridadServiceProvider } from '../providers/usuarios-service/seguridad-service';

import { InterceptorProvider  } from '../providers/interceptors/interceptor-provider';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddTurnoPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,    
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddTurnoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    AutocompletePacienteServiceProvider,
    AutocompleteObrasocialServiceProvider,
    AutocompleteProvinciaProvider,
    AutocompleteLocalidadProvider,
    TurnosServiceProvider,
    PacienteServiceProvider,
    DniValidator,
    UserValidator,
    UsuariosServiceProvider,
    ProfesionalesProvider,
    SeguridadServiceProvider,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },    
  ]

})
export class AppModule {}
