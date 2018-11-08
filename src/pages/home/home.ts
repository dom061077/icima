import { Component, ViewChild, NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalendarComponent} from "ap-angular-fullcalendar";
import { AddTurnoPage } from "../add-turno/add-turno";
import { Globals } from '../../app/globals'
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   profesionales = [];
  gender;
  proUrl=Globals.httphost+'/api/generalLookup/profesionales.json'; 

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
        //events: this.loadEvents.bind(this)
        events: [
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
        ]        

  
      };

      private eventDrop( event, delta, revertFunc, jsEvent, ui, view ){
        //this.turnosService.moverTurno(event.id,event.start,event.end);
          console.log('Evento eventDrop');
      }
  
      private loadEvents(start, end, timezone, callback){
        //  callback(this.events$);  
      }
   
      private onEventResize( event, delta, revertFunc, jsEvent, ui, view ){
        //  this.turnosService.moverTurno(event.id,event.start,event.end);
          console.log('Evento eventResize');
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
            this.navCtrl.push(AddTurnoPage,{startDate:start,endDate:end});
        });
    }
  
      private eventClick(event,jsEvent,view){
           // this.navCtrl.push(ViewTurnoPage,{id:event.id
           //         ,dni:event.dni,apellido:event.apellido,nombre:event.nombre
           //         ,start:event.start,end:event.end,title:event.title});
           console.log('Evento eventClick');
      }
  
  
  
    volverFecha(){
  
        this.myCalendar.fullCalendar('gotoDate','2017-10-06T17:00:00');
    }
  

  constructor(public navCtrl: NavController,public zone:NgZone,private http: HttpClient) {
      this.http.get(this.proUrl).subscribe(result=>{
        this.profesionales=  result;
      });
  }

}
