import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})
export class Tab2Page {

  public list:any=[];

  productos: any;

  constructor() {}

  ionViewWillEnter(){
    this.list = JSON.parse(localStorage.getItem('MisFav') || '{}');
  }

  ngOnInit(){
    //ngview algo
    // setInterval(()=>{
    //   this.list = JSON.parse(localStorage.getItem('MisFav') || '{}');
    // },500)
    
  }

  deleteFavoritos(item:any){
    item.isFavorite=false;
    this.list=this.list.filter((i: { id: any; })=>{
      return i.id!== item.id
    })
    localStorage.setItem('MisFav', JSON.stringify(this.list));
    this.list = JSON.parse(localStorage.getItem('MisFav') || '{}');
  }
}
