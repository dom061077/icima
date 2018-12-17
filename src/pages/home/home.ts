import { Component, ViewChild, NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalendarComponent} from "ap-angular-fullcalendar";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddTurnoPage } from "../add-turno/add-turno";
import { Globals } from '../../app/globals';
import { OpABM } from '../../app/globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { TurnoItem  } from '../../models/turnos/turno-item.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profesionales;
  profesionalId;
  proUrl=Globals.httphost+'/api/generalLookup/profesionales.json'; 
  turnosUrl=Globals.httphost+'/api/listturnos';
  updateTurnosUrl=Globals.httphost+'/api/updateturno';
  turnos = [];
  data: any;
  startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
  profesionalId$:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
    calendarOptions:Object = {
		header: {
			    	left: 'prev,next today',
		    		right: 'month,agendaWeek,agendaDay',
                    center: 'title'
                }, 
        allDaySlot : false,    
        buttonText : {today:'hoy',month:'Mes',week:'Semana',day:'Día',list:'Lista'},
        monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames:['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        dayNamesShort:['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
        minTime: '06:00:00',    
        slotDuration: Globals.slotDuration,
        selectable: true,
        defaultView: 'agendaWeek' ,
        selectHelper: true,
        height: 'parent',
        fixedWeekCount : false,
        defaultDate: new Date().toISOString(),
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        eventDrop: this.eventDrop.bind(this),
        select : this.selectEvent.bind(this),
        eventClick: this.eventClick.bind(this),
        eventResize: this.onEventResize.bind(this),
        events: this.loadEvents.bind(this)
        /*events: [
          {
            title: 'All Day Event',
            start: '2018-09-01'
          },
          {
            title: 'Long Event',
            start: '2018-09-07',
            end: '2018-09-10'  
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-09-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-09-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2018-09-11',
            end: '2018-09-13'
          },
          {
            title: 'Meeting',
            start: '2018-09-12T10:30:00',
            end: '2018-09-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2018-09-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2018-09-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2018-09-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2018-09-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2018-09-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2018-09-28'
          }
        ] */       

  
      }; 

      private eventDrop( event, delta, revertFunc, jsEvent, ui, view ){
        //this.turnosService.moverTurno(event.id,event.start,event.end);
          const turnoItem = {} as TurnoItem;
          turnoItem.start = event.start;
          turnoItem.end = event.end;
          turnoItem.id = event.id;
          this.http.post(this.updateTurnosUrl,JSON.stringify(turnoItem)
            ,{headers:new HttpHeaders().set('Content-Type','application/json')}
          ).subscribe();

      }
  
      private loadEvents(start, end, timezone, callback){
          callback(this.turnos);  
      }
   
      private onEventResize( event, delta, revertFunc, jsEvent, ui, view ){
        //  this.turnosService.moverTurno(event.id,event.start,event.end);
          const turnoItem = {} as TurnoItem;
          turnoItem.start = event.start;
          turnoItem.end = event.end;
          turnoItem.id = event.id;
          this.http.post(this.updateTurnosUrl,JSON.stringify(turnoItem)
            ,{headers:new HttpHeaders().set('Content-Type','application/json')}
          ).subscribe();
      }
  
    
      private dayClick(date, jsEvent, view){
        // this.selectedDay = date;
       //this.navCtrl.push(AddTurnoPage,{id:date.id,date:date
       //   ,duracion:Globals.duracion
       //   ,dateFormat:date.locale('es').format('L'),hora:date.format('LT')});
          console.log('Evento dayClick');
          
      } 
  
      private selectEvent(start, end, allDay){
        this.zone.run(() =>{
            this.navCtrl.push(AddTurnoPage,{startDate:start,endDate:end,profesionalId:this.profesionalId,op:OpABM.ALTA});
        });
    }
  
      private eventClick(event,jsEvent,view){
           // this.navCtrl.push(ViewTurnoPage,{id:event.id
           //         ,dni:event.dni,apellido:event.apellido,nombre:event.nombre
           //         ,start:event.start,end:event.end,title:event.title});
           console.log('Evento eventClick');
           this.navCtrl.push(AddTurnoPage,{turnoId:event.id
              ,startDate:event.start,endDate:event.end
              ,dni:event.dni,apellidoNombre:event.apellidoNombre
              ,op:OpABM.MODIFICACION
              ,estado:event.estado
            })
      }
  
   
   
    volverFecha(){
  
        this.myCalendar.fullCalendar('gotoDate','2017-10-06T17:00:00');
    }
  

  constructor(public navCtrl: NavController,public zone:NgZone,private http: HttpClient) {
      this.getTurnos();
      
      this.http.get(this.proUrl).subscribe((result:any)=>{
        this.profesionales =  result.list;
        this.profesionalId = result.list[0].id;
        this.profesionalId$.next(this.profesionalId);
      });
       
  }
 


  ngAfterViewInit(){
    const momento = moment();
    momento.minutes(0);
    this.myCalendar.fullCalendar('gotoDate',momento.format());

    /*this.turnosList.subscribe(items=>{
            
            while (this.events$.length>0){
              this.events$.pop();

            }
            console.log('Antes de ingresar al foreach: items:'+items);
            items.forEach(element => {
              console.log('Elemento: '+element.title);
              this.events$.push({
                id: element.$key,
                title:element.title,
                start:element.start,
                end: element.end
              }); 
            });
            this.myCalendar.fullCalendar( 'refetchEvents' );
            
        
    });  */
 
  }

  private getTurnos() {
    this.data = Observable
    .interval(5000)
    //.mergeMapTo()
    .subscribe(data=>{
        /*data.forEach(element =>{
            console.log('Elemento: '+element);

        });*/
        this.fetchTurnosData().subscribe((dataturnos:any)=>{
            this.turnos.splice(0, this.turnos.length);
            this.turnos = dataturnos; 
            this.myCalendar.fullCalendar( 'refetchEvents' );


        });
        

    });
  }

  private fetchTurnosData() {
    return this.http.get(this.turnosUrl+'?profesionalId='+this.profesionalId$.getValue());
  }  
 
 

  onProfesionalChange(){
      this.profesionalId$.next(this.profesionalId);
      this.fetchTurnosData().subscribe((dataturnos:any)=>{
        this.turnos.splice(0, this.turnos.length);
        this.turnos = dataturnos; 
        this.myCalendar.fullCalendar( 'refetchEvents' );

    });      
  }

}
