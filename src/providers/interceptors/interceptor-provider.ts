import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpEvent, HttpResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError, mergeMap } from 'rxjs/operators';
 
@Injectable()
export class InterceptorProvider implements HttpInterceptor {
 
    constructor(private storage: Storage, private alertCtrl: AlertController
        ,private loadingCtrl:LoadingController) { 
            

        }
    
    // Intercepts all HTTP requests!
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        let promise = this.storage.get('access_token');
        let loading = this.loadingCtrl.create({content:'trabajando...'});
        //loading.present();
        return Observable.fromPromise(promise)
            .mergeMap(token => {
                let clonedReq = this.addToken(request, token);
                console.log('INTERCEPTANDO');
                return next.handle(clonedReq)
                    .pipe(
                        catchError(error => {
                            // Perhaps display an error for specific status codes here already?
                            loading.dismiss();
                            let msg = error.message;
                            let title = error.name;
                            if (error.status == 401){
                                msg = 'Usuario o Contraseña incorrectos';
                                title = 'Error';
                            }           
                            if(error.status == 400){
                                msg = 'Ingrese usuario y contraseña';
                                title = 'Error';
                            }             
     
                            let alert = this.alertCtrl.create({
                                title: title,
                                message: msg,
                                buttons: ['OK'] 
                            }); 
                            alert.present();
     
                            // Pass the error to the caller of the function
                            return _throw(error);
                        })

                    )
                
                    .do((event:HttpEvent<any>)=>{
                        if ( event instanceof HttpResponse ) {
                            console.log('Terminado de recibir la respuesta');
                            //loading.dismiss();    
                        }                    

                    }

                );
            });
    }
 
    // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    'X-Auth-Token': `${token}`
                }
            });
            return clone;
        }
 
        return request;
    }
}