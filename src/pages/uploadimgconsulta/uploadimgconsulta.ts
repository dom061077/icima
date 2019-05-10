import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController,ToastController,Platform, LoadingController } from 'ionic-angular';

import { Camera,CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView  } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-home',
  templateUrl: 'uploadimgconsulta.html'//,
  //styleUrls: ['uploadimgconsulta.scss'],
})
export class UploadImgConsulta {
    images = [];
    constructor(private camera: Camera,private file: File,private actionSheetController: ActionSheetController
        ,private http: HttpClient,private webview: WebView
        ,private toastController  :ToastController,private plt:Platform, private loadingController: LoadingController
        ,private storage:Storage,private ref:ChangeDetectorRef){

    }

    ngOnInit(){
        this.plt.ready().then(() =>{
            this.loadStorageImages();

        });
    }

    loadStorageImages(){
        this.storage.get(STORAGE_KEY).then(images =>{
            if (images)  {
              let arr = JSON.parse(images);
              this.images = [];
              for(let img of arr){
                let filePath = this.file.dataDirectory + img;
                let resPath = this.pathForImage(filePath);
                this.images.push({name:img,path: resPath, filePath: filePath})
              }

            }
        });
    }

    pathForImage(img){
      if(img === null){
        return '';
      }else{
        let converted = this.webview.convertFileSrc(img);
        return converted;
      }
    }

    async presentToast(text){
      const toast = await this.toastController.create({
          message:text,
          position:'bottom',
          duration: 3000
      });
      toast.present();
    }

    async selectImage(){
      console.log('Seleccionando la imagen');
      const actionSheet = await this.actionSheetController.create({
          title: "Select image source"  ,
          buttons: [{
                text:'Load from Library',
                handler:()=>{
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text:'Use Camera',
                handler:()=>{
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text:'Cancel',
                role:'Cancel'
            }
          ]
      });
      await actionSheet.present();
    }

    async takePicture(sourceType: PictureSourceType){
        var options : CameraOptions={
          quality: 100,
          sourceType: sourceType,
          saveToPhotoAlbum : false,
          correctOrientation: true
        };
        this.camera.getPicture(options).then(imagePath => {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/')+1);
            var correctPath = imagePath.substr(0,imagePath.lastIndexOf('/')+1);
            //this.copyFileToLocalDir(correctPath,currentName,this.createFileName());

        });
    }

}
