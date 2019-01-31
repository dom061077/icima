import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Globals
{
    static readonly slotDuration: string = '00:15:00';
    static readonly duracion:number=15;
    static readonly httphost:string='http://134.14.1.3';
    static pages$:BehaviorSubject<any> = new BehaviorSubject([]);
    static roles = [];
      

};

export enum OpABM {
    ALTA,
    BAJA,
    MODIFICACION
  }

