import { OnInit, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AutocompletePacienteServiceProvider  } from '../../providers/autocomplete-paciente-service/autocomplete-paciente-service';
//import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { HomePage } from '../home/home';
import { TurnosServiceProvider } from '../../providers/turnos-service/turnos-service';
import { TurnoItem  } from '../../models/turnos/turno-item.interface';
import { HttpClient,HttpHeaders } from '../../../node_modules/@angular/common/http';


/**
 * Generated class for the AddTurnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add-turno',
  templateUrl: 'add-turno.html',
})
export class AddTurnoPage implements OnInit {
  formAdd: FormGroup;
  //turnos : FirebaseListObservable<any[]>;
  idTurno:any;
  startDate:any;
  dateFormat:any;
  hora:any;
  duracion:number;
  endDate:any;
  
  $keyPaciente:string;
  apellidoNombre:string;
  apellido:string;
  nombre:string;
  dni:string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams
      ,public autocompleteService:AutocompletePacienteServiceProvider
      //,private database: AngularFireDatabase
        ,public formBuilder: FormBuilder//,private turnoService: TurnosServiceProvider 
        ,private http: HttpClient
        )  {
      //this.turnos = database.list('turnos');
      this.idTurno = navParams.get('id');
      this.startDate = navParams.get('startDate');
      this.endDate = navParams.get('endDate');
      this.dateFormat = navParams.get('dateFormat');
      this.hora = navParams.get('hora');
      console.log('Duracion en constructor: '+navParams.get('duracion'));
      this.duracion = navParams.get('duracion');

      if(!this.idTurno){ 
          console.log('No tiene ID de turno');
      }
    

  }


  /* método que captura la información del paciente seleccionado
     en el autocomplete 
  */ 
  itemSelected(event){

      this.$keyPaciente = event.$key;
      //this.formAdd.controls['duracion'].setValue(event.$key);
      this.apellido = event.apellido;
      this.apellidoNombre = event.apellidoNombre,
      this.nombre = event.nombre;
      this.dni = event.dni;


  }


  ionViewDidLoad() {
    
  }

  confirmar(){

      const turnoItem = {} as TurnoItem;
      turnoItem.paciente = {} 
      turnoItem.start = this.startDate.format();
      turnoItem.end = this.endDate.format();
      turnoItem.title = this.apellidoNombre;
      turnoItem.paciente[this.$keyPaciente] = {apellido:this.apellido
                    ,nombre:this.nombre,dni:this.dni};
      /*var apiUrl='http://localhost:8080/api/addturno';  
      this.http.post(apiUrl,JSON.stringify(
        {fechaStart:this.startDate.format(),fechaEnd:this.endDate.format()
          ,titulo:'TITULO DE TURNO  PRO'
        })
          ,{headers:new HttpHeaders().set('Content-Type','application/json')
        }
      ).subscribe();/
      */
     var apiUrl='http://localhost:8080/api/paciente/search';
     this.http.get(apiUrl,{filter:'medina'})



      //this.turnoService.addTurno(turnoItem,this.$keyPaciente);

      //this.navCtrl.push(HomePage) ;
  }

  pacienteValidator(control: FormControl): {[s: string]: boolean} {
    if (!this.$keyPaciente) {
      return {invalidDuracion: true};
    }
  }

  ngOnInit():any{
//https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/2      

      this.formAdd = this.formBuilder.group({
        //'pacienteId': ['',[Validators.required]],
          'duracion'   : ['', [Validators.required]]
      });
      
      console.log('Duración: '+this.duracion);
      this.formAdd.get('duracion').setValue(this.duracion);      
  }

  isValid() {
    
    //let formField = this.formAdd.get('duracion');
    //var valido=true;
    //valido=formField.valid || formField.pristine;
    if (!this.$keyPaciente)
      return false;

    return true;
  }  



}
