import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AutocompleteProvider  } from '../../providers/autocomplete/autocomplete';
import { Globals, OpABM } from '../../app/globals';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";

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

  matches: string;

  addUrl = Globals.httphost+'';

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public formBuilder: FormBuilder
    ,public autocompleteServiceCie10:AutocompleteProvider
    ) {
      this.formAdd = this.formBuilder.group({
        'matches'   : ['', []]
          
      });      
      this.turnoId = navParams.get('turnoId');
      this.apellidoNombrePaciente = navParams.get('apellidoNombrePaciente');
      this.nombreProfesional = navParams.get('nombreProfesional');
      autocompleteServiceCie10.setApiUrl(Globals.httphost+'/api/generalLookup/cie10');
      autocompleteServiceCie10.setLabelAttribute("descripcion");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitaPage');
  }

  confirmar(){

  }

  isUpdate(){
    
  }

  itemSelected(event){
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
