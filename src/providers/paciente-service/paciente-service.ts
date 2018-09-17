import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
//import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
//import { PacienteItem  } from '../../models/paciente/paciente-item';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the PacienteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacienteServiceProvider {
  //pacientesRef : FirebaseListObservable<any[]>;
  dniFilter:BehaviorSubject<string> = new BehaviorSubject<string>('');
  existeDni:boolean;
  constructor(/*private database: AngularFireDatabase*/) {
      /*this.pacientesRef = this.database.list('pacientes',{
          query:{
              orderByChild:'dni',
              equalTo:this.dniFilter
              
          }
      });
      this.pacientesRef.subscribe((data)=>{
                 
                 if(data.length>0){
                    this.existeDni = true;
                    console.log('Existe el dni');
                 }
        });
      this.dniFilter.next('0');*/

  }

  /**
   * 
   *         $key : string;
        dni : string;
        apellido: string;
        nombre: string;
        fechaNacimiento: string;
        estado_civil: string;
        domicilio : string;
        provincia: {$key:'',name:''};
        localidad: {$key:'',name:''};
        codigoPostal: string;
        telefono : string;
        sexo : string;
        estadoCivi: string;
        obraSocial: {$key:'',name:''};
   */

  addPaciente(/*pacienteItem:PacienteItem*/){
       /*pacienteItem.apellido = pacienteItem.apellido.toUpperCase();
       pacienteItem.nombre = pacienteItem.nombre.toUpperCase();
       pacienteItem.apellido_nombre=pacienteItem.apellido.toUpperCase()+' '+pacienteItem.nombre.toUpperCase();
       this.pacientesRef.push(pacienteItem);
       */
  }

  updatePaciente(/*pacienteItem:PacienteItem,$key:string*/){
        /*var item: FirebaseObjectObservable<any>;
        item = this.database.object('pacientes/'+$key);
        pacienteItem.apellido = pacienteItem.apellido.toUpperCase();
        pacienteItem.nombre = pacienteItem.nombre.toUpperCase();
        pacienteItem.apellido_nombre = pacienteItem.apellido+' '+pacienteItem.nombre;

        item.update(pacienteItem);*/

  }

  existePaciente(dni:string):boolean{
        this.existeDni = false;
        this.dniFilter.next(dni);
        return this.existeDni;
  }


}
