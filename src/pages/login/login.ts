import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
//import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage  } from '../home/home';
import { AlertController } from 'ionic-angular';
import { UsuariosServiceProvider  } from '../../providers/usuarios-service/usuarios-service';
import { ProfileItem } from '../../models/profile/profile-item.interface';

import {HttpClient, HttpHeaders} from '@angular/common/http';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

//https://chriztalk.com/ionic-3-and-firebase-authentication/ pagina para ver codigo de autenticacion
//https://reviblog.net/tag/ionic-3-firebase/

export class LoginPage {

  user = {} as User;

  constructor(public alertCtrl: AlertController,//private afAuth: AngularFireAuth,
              public navCtrl: NavController, public navParams: NavParams
              ,private userService:UsuariosServiceProvider
              ,private http: HttpClient
            ) {
  }
 
   login(user: User) {
    /*try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }  
    }
    catch (e) {
          let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Usuario o contraseña incorrectos',
              buttons: ['OK']
            });
          alert.present();
    }*/
    /*console.log('Login en page');
    var retorno=this.userService.login(user.email,user.password);
    if (retorno ) 
      this.navCtrl.setRoot(HomePage);
    else  {
      let alert = this.alertCtrl.create({
        title: 'Mensaje',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      alert.present();      
    }*/
    var apiUrl = 'http://localhost:8080/api/login';

    this.http.post(apiUrl,JSON.stringify({username:user.email,password:user.password})
    ,{headers:new HttpHeaders().set('Content-Type','application/json')

    }
    )
    .subscribe(res=>{
        if(res){
            console.log("Access token: "+res);
            let alert = this.alertCtrl.create({
              title: 'Mensaje',
              message: 'Usuario o contraseña incorrectos',
              buttons: ['OK']
            });
            alert.present();      
      
        }
        return false;    
    },(err)=>{
        console.log('Error en login');
        return false;
    });



  }
 
  async register(user: User) {
      var profile = {} as ProfileItem;
    //try {
      /*const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );*/
      //if (result) {
        
      
      //this.navCtrl.push(PerfilPage);

      //}
    /*} catch (e) {
      console.error(e);
    }*/
  }
}