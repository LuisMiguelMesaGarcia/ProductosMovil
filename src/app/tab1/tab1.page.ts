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

  public productosFav: any [] = [];

  public list:any=[];

  public localFav:any=[];

  public repetido:any[]=[];

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
    this.saveFavoritos(item);
    // if(item.isFavorite){
    //   this.saveFavoritos(item);
    // }else{
    //   this.deleteFavorite(item);
    // }
  }


  saveFavoritos(item: any){
    this.productosFav = JSON.parse(localStorage.getItem('MisFav') || '{}');
    this.repetido=this.productosFav.filter((i)=>{
          return i.id === item.id
    })

    console.log("separacion")
    console.log("item: "+ item.isFavorite)
    console.log("repetido: "+ this.repetido.length)

    if(this.repetido.length===0 && item.isFavorite===true){
      this.productosFav.push(item);
      localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
    }
    if(this.repetido.length===1 && item.isFavorite===false){
      this.productosFav=this.productosFav.filter((i)=>{
            return i.id!== item.id
    })
      localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
    }
  }
    // if(item.id)
    // this.productosFav.push(item);
    // localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
    

  //   this.repetido=this.productosFav.filter((i)=>{
  //     return i!== item
  //   })
  //   console.log();

  //   if(this.repetido.length>=2){
  //     this.productosFav.pop();
  //     localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
  //   }
  //   if(item.isFavorite!== true){
  //     this.productosFav.pop();
  //     localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
  //   }
  // }


  // deleteFavorite(item:any){
  //   this.productosFav=this.productosFav.filter((i)=>{
  //     return i!== item
  //   })
  //   localStorage.setItem('MisFav', JSON.stringify(this.productosFav));
  // }
  

  
}
