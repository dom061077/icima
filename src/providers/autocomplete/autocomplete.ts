import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AutocompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteProvider implements AutoCompleteService  {
  apiUrl:string;
  labelAttribute:string;
  constructor(public http: HttpClient) {
    console.log('Hello AutocompleteProvider Provider');
  }

  public setApiUrl(apiUrl:string){
      this.apiUrl = apiUrl;
  }

  public setLabelAttribute(label:string){
      this.labelAttribute = label;
  }

  getResults(keyword:string){
      return this.http.get(this.apiUrl+'?filter='+keyword)
                  .map((result:any)=>{
                      return JSON.parse(JSON.stringify(result));
                  });
  }

}
