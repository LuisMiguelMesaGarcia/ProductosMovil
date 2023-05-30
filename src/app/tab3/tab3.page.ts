import { Component } from '@angular/core';
import { IonicModule, AlertController,ActionSheetController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import {TareasService}from '../services/tareas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab3Page {
  myTask: any [] = [];
  constructor(private alertCtrl:AlertController, private tareasService: TareasService, private actionSheetCtrl: ActionSheetController) { }

  ionViewDidEnter(){
    console.log('ejecutó');
    this.listarTareas();
  }

  listarTareas(){
    this.myTask = this.tareasService.getTareas();
  }

  

  async editar(item:any){
    const alert = await this.alertCtrl.create({
      header: "nueva tarea",
      inputs: [{
        name: "name",
        type: "text",
        value: item.name,
      }],
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'guardar', handler: (input) =>{
            console.log(input)
            this.tareasService.editarTarea(item,input);
            this.listarTareas();
          }
        }]
    })
    await alert.present();
  }

  async addTask(){
      const alert = await this.alertCtrl.create({
        header: "nueva tarea",
        inputs: [{
          name: "name",
          type: "text",
          placeholder: "Ingrese su tarea"
        }],
        buttons:[
          {
            text:'cancelar',
            role:'cancel'
          },
          {
            text:'guardar', handler: (task) =>{
              this.tareasService.postTarea(task);
              this.listarTareas();
            }
          }]
      })
      await alert.present();

  }

  async openAtions(tarea: any){
      const actionSheet = await this.actionSheetCtrl.create({
        header: "Que quieres hacer?",
        buttons: [{
          text: tarea.isDone ? 'Desmarcar' : 'Hecho',
          handler: () => {
            tarea.isDone = !tarea.isDone;
            this.tareasService.updateTarea(tarea);
            this.listarTareas()
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
  }

  //////Borrar//////////
  deleteTask(tarea:any){
    let key = 'collection';
    let value = localStorage.getItem(key);
    
    if(value === null || value === undefined){
      return;
    }else{
      let collection: any[] = JSON.parse(value);

      collection= collection.filter((i)=>{
        return i.name !== tarea.name;
      })    
      localStorage.setItem(key, JSON.stringify(collection));
    }
    this.listarTareas();
  }

}
