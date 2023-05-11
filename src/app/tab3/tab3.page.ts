import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab3Page {
  myTask: any [] = [];
  constructor(private alertCtrl:AlertController) {}

 async addTask(){
    const alert = await this.alertCtrl.create({
      header: "nueva tarea",
      inputs: [{
        name: "task",
        type: "text",
        placeholder: "Ingrese su tarea"
      }],
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'guardar'
        }]
    })
    await alert.present();

  }
}
