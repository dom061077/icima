import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutocompleteProvider  } from '../../providers/autocomplete/autocomplete';
import { Globals } from '../../app/globals';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public autocompleteService:AutocompleteProvider
    ,public formBuilder: FormBuilder) {
      this.formAdd = this.formBuilder.group({
      });      
      autocompleteService.setApiUrl(Globals.httphost+'/api/generalLookup/cie10');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitaPage');
  }

  confirmar(){

  }

  isUpdate(){
    
  }

}
