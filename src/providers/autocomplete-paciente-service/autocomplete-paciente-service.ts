import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Globals } from '../../app/globals'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
//import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';




/*
  Generated class for the AutocompletePacienteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompletePacienteServiceProvider implements AutoCompleteService  {
  apiUrl = Globals.httphost+'/api/paciente/search';
  labelAttribute = "apellidoNombre";
  pacientesList=
    [ {apellidoNombre:"GARAMENDI SUSANA ESTER"}
    ,{apellidoNombre:"BAZAN NOEMI DEL CARMEN"}
    ,{apellidoNombre:"GOMEZ PATRICIA CAROLINA"}
    ,{apellidoNombre:"JIMENEZ JESUS ROBUSTIANO"}
    ,{apellidoNombre:"ROMERO JUANA OLGA"}
    ,{apellidoNombre:"SANTANA JUAREZ ROCIO MERCEDES"}
    ,{apellidoNombre:"SOSA ANTONIA DEL CARMEN"}
    ,{apellidoNombre:"GOMEZ BRAHIAM"},{apellidoNombre:"SORIA LUCIA MERCEDES"}
    ,{apellidoNombre:"GIMENEZ LASCANO FELICITAS"}];
  //items: FirebaseListObservable<any>
  showSpinner:boolean=false;

   limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
   startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endScroll:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   lastKey: string='';
   queryable: boolean = true;
   infiniteScroll:any;


constructor(private http: HttpClient /*private database: AngularFireDatabase */) {
           /* this.database.list('/pacientes' , {
                query: {
                    orderByChild: 'apellido_nombre'
                    ,limitToLast: 1
                    ,startAt : this.startat
                    ,endAt : this.endat                    
                }
            }).subscribe((data) => {
                // Found the last key
                data.forEach(element=>{ 
                    this.lastKey = element.$key;

                });
                if (data.length > 0) {
                    
                } else {
                    this.lastKey = '';
                }
            });
            
            this.items = this.database.list('/pacientes', {
                query: {
                    orderByChild: 'apellido_nombre'
                    ,limitToFirst: this.limit
                    ,startAt : this.startat
                    ,endAt : this.endat
                }
            });

            this.items.subscribe( (data) => {
                if (data.length > 0) {
                    // If the last key in the list equals the last key in the database
                    if (data[data.length - 1].$key === this.lastKey) {
                        this.queryable = false;
                    } else {
                        this.queryable = true;
                    }
                }
                while(this.pacientesList.length){
                    this.pacientesList.pop();

                }
                data.forEach(element => {
                    //console.log('Obra social: '+element.descripcion);
                    this.pacientesList.push({
                      apellidoNombre:element.apellido_nombre,
                      dni:element.dni,
                      apellido: element.apellido,
                      nombre: element.nombre,
                      $key: element.$key
                    });
                  });
                        
                if (this.infiniteScroll)
                    this.infiniteScroll.complete();
                this.showSpinner = false;       
                console.log('Se TERMINO DE DESCARGAR EL LIST');
            });     */     
            

  }

   getResults(keyword:string) {
        
                
            return this.http.get(this.apiUrl+'?filter='+keyword)
                    .map(
                        result =>
                            {
                                //return result.list.JSON.filter(item => item.nombre.toLowerCase().startsWith(keyword.toLowerCase()) )
                                return JSON.parse(JSON.stringify(result.list));//.filter(item=>item.apellidoNombre.toLowerCase().startsWith(keyword.toLowerCase()));
                            }
                    );
         


        /*while (this.pacientesList.length>0){
          this.pacientesList.pop();

        }*/
        
        /*if(keyword){
            this.endat.next(keyword.toUpperCase()+'\uf8ff');
            this.startat.next(keyword.toUpperCase());
            this.showSpinner = true;
        }else{
            this.showSpinner = true;
            this.endat.next('\uf8ff');
            this.startat.next('');
        }        
        return JSON.parse(JSON.stringify(this.pacientesList)).filter(item => item.apellidoNombre.toLowerCase().startsWith(keyword.toLowerCase()) );    
        */
      

  }

}
