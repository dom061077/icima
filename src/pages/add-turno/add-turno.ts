import { OnInit, Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Platform  } from 'ionic-angular';
import { AutocompletePacienteServiceProvider  } from '../../providers/autocomplete-paciente-service/autocomplete-paciente-service';
//import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { HomePage } from '../home/home';
import { TurnosServiceProvider } from '../../providers/turnos-service/turnos-service';
import { TurnoItem  } from '../../models/turnos/turno-item.interface';
import { HttpClient,HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Globals, OpABM } from '../../app/globals';
import { AlertController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';


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
  isRecording = false;
  matches: String;

  turnos = [];
  titulo:string;
  estadosTurnos = [];
  estadoId : any;

  tipoOperacion : string;

  addTurnoUrl = Globals.httphost+'/api/addturno';
  updTurnoUrl = Globals.httphost+'/api/updateturnoestado';
  dltTurnoUrl = Globals.httphost+'/api/deleteturno';
  estadosTurnoUrl = Globals.httphost+'/api/generalLookup/listestadosturnos.json';
  formAdd: FormGroup;
  //turnos : FirebaseListObservable<any[]>;
  turnoId:any;
  startDate:any;
  dateFormat:any;
  hora:any;
  duracion:number;
  endDate:any;
  
  $keyPaciente:number;
  apellidoNombre:string;
  apellido:string;
  nombre:string;
  dni:string;
  profesionalId:number;

  operacion:OpABM;
  

  constructor(public navCtrl: NavController, public navParams: NavParams
      ,public autocompleteService:AutocompletePacienteServiceProvider
      //,private database: AngularFireDatabase
        ,public formBuilder: FormBuilder//,private turnoService: TurnosServiceProvider 
        ,private http: HttpClient
        , private alertCtrl: AlertController
        ,private speechRecognition: SpeechRecognition
        ,private plt: Platform
        , private cd: ChangeDetectorRef
        )  {
      //this.turnos = database.list('turnos');
      this.http.get(this.estadosTurnoUrl).subscribe((result:any)=>{
          this.estadosTurnos = result  
      });
      this.turnoId = navParams.get('turnoId');
      this.startDate = navParams.get('startDate');
      this.endDate = navParams.get('endDate');
      this.dateFormat = navParams.get('dateFormat');
      this.hora = navParams.get('hora');
      console.log('Duracion en constructor: '+navParams.get('duracion'));
      this.duracion = navParams.get('duracion');
      this.profesionalId = navParams.get('profesionalId');

      if(!this.turnoId){ 
          console.log('No tiene ID de turno');
      }
      
      this.formAdd = this.formBuilder.group({
        //'pacienteId': ['',[Validators.required]],
          'duracion'   : ['', [Validators.required]],
          'estadoId'   : ['', []]
      });
      
      this.operacion = navParams.get('op');
      this.titulo = 'Turno - Registro';
      if (this.operacion == OpABM.MODIFICACION){
        this.apellidoNombre = navParams.get('apellidoNombre');
        this.dni = navParams.get('dni');
        this.titulo = 'Turno - Modificación';
        this.estadoId = navParams.get('estado');
      }
      this.formAdd.get('duracion').setValue(this.duracion);    


  }

  



  /* método que captura la información del paciente seleccionado
     en el autocomplete 
  */ 
  itemSelected(event){

      this.$keyPaciente = event.id;
      //this.formAdd.controls['duracion'].setValue(event.$key);
      this.apellido = event.apellido;
      this.apellidoNombre = event.apellidoNombre,
      this.nombre = event.nombre;
      this.dni = event.dni;


  }


  ionViewDidLoad() {
    
  }

  update(){
    const turnoItem = {} as TurnoItem;
    turnoItem.id = this.turnoId;
    turnoItem.estado = this.estadoId;
    this.http.post(
        this.updTurnoUrl
        ,JSON.stringify(turnoItem)
        ,{headers:new HttpHeaders().set('Content-Type','application/json')}
    ).subscribe((result:any)=>{
      if(!result.success){
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: result.message,
          buttons: ['OK'] 
        }); 
        alert.present();   
      }            
    });
  }

  delete(){
    const turnoItem = {} as TurnoItem;
    turnoItem.id = this.turnoId;
    this.http.delete(this.dltTurnoUrl+'/'+this.turnoId
      ,{headers:new HttpHeaders().set('Content-Type','application/json')}
    ) .subscribe((result:any)=>{
      this.navCtrl.push(HomePage) ;
    });
  }

  add(){
    const turnoItem = {} as TurnoItem;

    turnoItem.start = this.startDate.format();
    turnoItem.end = this.endDate.format();
    turnoItem.title = this.apellidoNombre;
    turnoItem.pacienteId = this.$keyPaciente;
    turnoItem.profesionalId = this.profesionalId;
    this.http.post(this.addTurnoUrl,JSON.stringify(
      //{fechaStart:this.startDate.format(),fechaEnd:this.endDate.format()
      //  ,titulo:'TITULO DE TURNO  PRO'
      //}
      turnoItem 
    )
        ,{headers:new HttpHeaders().set('Content-Type','application/json')
      }
    ).subscribe((result:any)=>{
      this.navCtrl.push(HomePage) ;

    });

  }

  ngAfterViewInit(){
      console.log('After View Init en add-turno.ts');    
  }


  confirmar(){

      if(this.operacion == OpABM.ALTA)
        this.add();
      if(this.operacion == OpABM.MODIFICACION)       
        this.update();


      //this.turnoService.addTurno(turnoItem,this.$keyPaciente);

      this.navCtrl.push(HomePage) ;
  }



  pacienteValidator(control: FormControl): {[s: string]: boolean} {
    if (!this.$keyPaciente) {
      return {invalidDuracion: true};
    }
  }

  ngOnInit():any{
//https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/2      

  
  }


  ionViewDidEnter(){
    console.log('Evento ionViewDidEnter EN ADD-TURNO.ts');
  }  



  isValid() {
    
    //let formField = this.formAdd.get('duracion');
    //var valido=true;
    //valido=formField.valid || formField.pristine;
    if (!this.$keyPaciente)
      return false;

    return true;
  }  

  isUpdate(){
      if (this.operacion==OpABM.ALTA)
        return false;
      return true;
  }



  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    console.log('Get permission en add turno');
    /*this.speechRecognition.hasPermission().then(
        () =>{console.log('Granted')},
        () =>{console.log('Denied')}

    );*/
    window['plugins'].speechRecognition.hasPermission(permission => {
      if(permission)
          console.log('Tiene permiso');
      else
          console.log('No tiene permiso');
      
    });
  }
 
  startListening() {

    /*this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    )


    this.speechRecognition.startListening()
    .subscribe(
      (matches: Array<string>) => console.log(matches),
      (onerror) => console.log('error:', onerror)
    )*/
    window['plugins'].speechRecognition.hasPermission(permission => {

      if (!permission) {
        window['plugins'].speechRecognition.requestPermission(_ => {
          console.log('Pidiendo permiso');
          window['plugins'].speechRecognition.startListening(terms => {
            console.log('Terms: '+terms);
            if (terms && terms.length > 0) {
              this.matches = terms[0];
            } else {
              
            }
          }
        );
        });
      } else {
        window['plugins'].speechRecognition.startListening(terms => {
          if (terms && terms.length > 0) {
              console.log('Terms: '+terms[0]);
              this.matches = terms[0];
          } else {
            
          }
        });
      }
    });   

  }

  isIos() {
    return this.plt.is('ios');
  }

}
