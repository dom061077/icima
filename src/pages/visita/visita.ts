import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AutocompleteProvider  } from '../../providers/autocomplete/autocomplete';
import { Globals, OpABM } from '../../app/globals';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { HttpClient,HttpHeaders } from '../../../node_modules/@angular/common/http';
import { VisitaItem } from '../../models/visita/visita-item.interface';
import { HomePage } from '../home/home';

/**
 * Generated class for the VisitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-visita',
  templateUrl: 'visita.html',
})
export class VisitaPage {
  formAdd: FormGroup;
  turnoId:number;
  cie10Id:number;
  apellidoNombrePaciente:string;
  nombreProfesional:string;
  estadosConsultas=[];
  estadosConsultaUrl = Globals.httphost+'/api/generalLookup/listEstadoConsulta.json';

  matches: string;

  addConsultaUrl = Globals.httphost+'/api/addconsulta';

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public formBuilder: FormBuilder
    ,public autocompleteServiceCie10:AutocompleteProvider
    ,private http: HttpClient ) {
      this.formAdd = this.formBuilder.group({
        'matches'   : ['', [Validators.required]],
        'estado'    : ['', [Validators.required]]

          
      });      
      this.turnoId = navParams.get('turnoId');
      this.apellidoNombrePaciente = navParams.get('apellidoNombrePaciente');
      this.nombreProfesional = navParams.get('nombreProfesional');
      autocompleteServiceCie10.setApiUrl(Globals.httphost+'/api/generalLookup/cie10');
      autocompleteServiceCie10.setLabelAttribute("descripcion");
      this.http.get(this.estadosConsultaUrl).subscribe((result:any)=>{
          this.estadosConsultas = result;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitaPage');
  }

  confirmar(){
      console.log('Valor de contenido: '+this.formAdd.get('matches').value);
      const visitaItem = {} as VisitaItem;
      visitaItem.turnoId = this.turnoId;
      visitaItem.contenido = this.formAdd.get('matches').value;
      visitaItem.estado = this.formAdd.get('estado').value;
      visitaItem.cie10Id = this.cie10Id;

      //visitaItem.turnoId = this.formAdd.get
      //console.log('Es válido: '+this.formAdd.controls.matches.valid);
      if(this.formAdd.valid)
        //console.log('Formulario válido');
        this.http.post(this.addConsultaUrl,JSON.stringify(visitaItem)
          ,{headers:new HttpHeaders().set('Content-Type','application/json')}
        ).subscribe((result:any)=>{
            this.navCtrl.push(HomePage);
        });
      else
        console.log('Formulario con errores');  
  }

  isUpdate(){
    
  }

  itemCie10Selected(event){
      console.log('Evento CIE10: '+event.id);
      this.cie10Id = event.id;

  }

  ngOnInit():any{
  
    /*this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if (!hasPermission) {
        this.speechRecognition.requestPermission()
          .then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
        }

     });  */      
      
  }

  activarVoz(){
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
    

}
