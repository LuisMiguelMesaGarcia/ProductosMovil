import { Component,OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SERVICESService } from "../services/services.service";
import { CommonModule } from '@angular/common';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,CommonModule],
})
export class Tab1Page {
  constructor(public http:SERVICESService) {}

  productosFav: any [] = [];

  public list:any=[];

  ngOnInit(): void {
    this.function_get_PRODUCTOS();
    
  }

  public function_get_PRODUCTOS(){
    this.http._getProducto_().subscribe((resp:any)=>{
      resp.products.forEach((element: { isFavorite: boolean; }) => {
        element.isFavorite = false;
        
      });
       this.list=resp.products;
      //  console.log(this.list);
    })
  }

  statusFavorite(item: any){
    this.list[item.id -1].isFavorite = !this.list[item.id -1].isFavorite;
    this.saveFavoritos(item);
  
  }

  saveFavoritos(item: any){
    this.productosFav.push(item);
    localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
  }
  
}
