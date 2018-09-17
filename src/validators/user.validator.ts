import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
//import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserValidator{
    //userRef : FirebaseListObservable<any[]>;
    userNameFilter:BehaviorSubject<string> = new BehaviorSubject<string>('');
    debouncer:any;
    pacientesList:any;
    subscriptor:any;

    constructor(public pacienteService:UsuariosServiceProvider
            ,/*private database: AngularFireDatabase*/){
                /*this.userRef = this.database.list('profiles',{
                    query:{
                        orderByChild:'email',
                        equalTo:this.userNameFilter
                        
                    }
                });*/
                
    }

    password2Match(control: FormControl):any{
        return new Promise(resolve=>{
            if(control.value==control.root.value['password']){
                resolve (null);
            }else{
                resolve ({'password2MissMatching':true});    
            }
    
        })
    }

    passwordMatch(control: FormControl):any{
        return new Promise(resolve=>{
            if(control.value==control.root.value['password2']){
                resolve (null);
            }else{
                resolve ({'passwordMissMatching':true});    
            }
    
        })
    }
    

    checkUserName(control: FormControl):any{
        clearTimeout(this.debouncer);
        
        return new Promise(resolve=>{
                /*this.userNameFilter.next(control.value);
                this.debouncer = setTimeout(()=> {
                    
                    this.subscriptor = this.userRef.subscribe((data)=>{
                            if(data.length>0){
                                resolve({'userexists':true});
                            }
                            else{
                                resolve(null);
                            }
                                
                    });
                        
                }, 1000);
                */    
        
        });
        
    }
}