import { Injectable } from '@angular/core';
//import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
//import { AngularFireAuth  } from 'angularfire2/auth';
import * as firebase from 'firebase';
//import { ProfileUserItem } from '../../models/profile/profile-user-item.interface';
//import { ProfileItem } from '../../models/profile/profile-item.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription  } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ReplaySubject } from '../../../node_modules/rxjs';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Globals } from '../../app/globals'
//import 'rxjs/add/operator/map';




/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {
  subscriptionGetUserCount: Subscription;
  subscriptionGetUserItems: Subscription;
  completedQueryObs = new Subject();
  //items: FirebaseListObservable<any>

  limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
  startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
  endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
  lastKey: string='';  
  queryable:boolean;

  apiUrl = Globals.httphost+'/api/login';

  constructor(private http: HttpClient,public storage: Storage) {
        /*this.subscriptionGetUserCount =  this.database.list('profiles',{
              query:{
                  orderByChild: 'apellido_nombre'
                  ,limitToLast: 1
                  ,startAt : this.startat
                  ,endAt : this.endat                     
              }
              }).subscribe(data=>{
                  data.forEach(element=>{ 
                      this.lastKey = element.$key;
                  });
                  if (data.length <= 0) {
                    this.lastKey = ''; 
                  }
              });
        this.items =   this.database.list('profiles',{
            query:{
                orderByChild: 'apellido_nombre'
                ,startAt : this.startat
                ,endAt : this.endat                     
            }
        });
        this.subscriptionGetUserItems = this.items.subscribe(data=>{
            if (data.length > 0) {
                // If the last key in the list equals the last key in the database
                if (data[data.length - 1].$key === this.lastKey) {
                    this.queryable = false;
                } else {
                    this.queryable = true;
                }
            }
            //if (this.infiniteScroll)
            //    this.infiniteScroll.complete();
            //this.showSpinner = false;       
            console.log('Consulta completa');
            this.completedQueryObs.next(true);
        });
        */    
  } 

   login(usuario_par:string,password_par:string){
        let _storage = this.storage;
        return new Promise(resolve => 
        this.http.post(this.apiUrl,JSON.stringify({username:usuario_par,password:password_par})
        ,{headers:new HttpHeaders().set('Content-Type','application/json')

        }
        ) 
        .subscribe((res:any)=>{ 
            if(typeof res.access_token !== 'undefined'){
                this.storage.set('access_token',res.access_token); 
                resolve(res)  ;
            }
        },(err)=>{
            console.log('Error en login');
            return false;
        })
    );

        
  }

    async addUser(/*profileuser:ProfileUserItem*/){
      /*const result = await  this.afAuth.auth.createUserWithEmailAndPassword(
        profileuser.user.email,
        profileuser.user.password

      ).then(data=>{
        const idUsuario = data.uid;
        profileuser.profile.email = profileuser.user.email;
        profileuser.profile.apellido_nombre = profileuser.profile.apellido+' '+profileuser.profile.nombre;
        this.database.object('profiles/'+idUsuario).set(profileuser.profile);
          

      });*/
    }

    async changePassword(oldPassword:string, newPassword:string){
        /*var email=this.afAuth.auth.currentUser.email;
        //var credential: FIRAuthCredential;
        //this.afAuth.auth.currentUser.
        //this.afAuth.auth.currentUser.reauthenticateWithCredential();
        const credential = firebase.auth.EmailAuthProvider.credential(email,oldPassword);
        await this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
        await this.afAuth.auth.currentUser .updatePassword(newPassword).then(data=>{
                console.log('Pasa por el then '+data);
        });*/

    }

    async changeEmail(email:string){
        //await this.afAuth.auth.currentUser.updateEmail(email)    ;
    }
    
    getUsers(filter:string){
        console.log('Filtro: '+filter);
        this.endat.next(filter+'\uf8ff');
        this.startat.next(filter);
    }  

    updateProfile(/*profile:ProfileItem,userKey:string*/){
        /*var item : FirebaseObjectObservable<any>;
        item = this.database.object('profiles/'+userKey);
        let profileItem = {} as ProfileItem;
        profileItem.apellido = profile.apellido;
        profileItem.nombre = profile.nombre;
        profileItem.apellido_nombre = profile.apellido+' '+profile.nombre;
        profileItem.tipoUsuario = profile.tipoUsuario;
        item.update(profileItem);
        */
    }


    unsubscribeAll(){
        this.subscriptionGetUserCount.unsubscribe();
        this.subscriptionGetUserItems.unsubscribe();
    }




}
