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
    item.isFavorite = !item.isFavorite;
    if(item.isFavorite){
      this.saveFavoritos(item);
    }else{
      this.deleteFavorite(item);
    }
    
  
  }

  saveFavoritos(item: any){
    this.productosFav.push(item);
    localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
  }
  deleteFavorite(item:any){
    this.productosFav=this.productosFav.filter((i)=>{
      return i!== item
    })
    localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
  }
  
}
