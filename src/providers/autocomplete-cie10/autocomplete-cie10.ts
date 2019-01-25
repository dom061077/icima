import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoCompleteService} from 'ionic2-auto-complete';

/*
  Generated class for the AutocompleteCie10Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteCie10Provider {

  constructor(public http: HttpClient) {
    console.log('Hello AutocompleteCie10Provider Provider');
  }

}
