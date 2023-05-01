import { Component,OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SERVICESService } from "../services/services.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,CommonModule],
})
export class Tab1Page implements OnInit {
  constructor(public http:SERVICESService) {}

  public list:any=[];

  ngOnInit(): void {
    this.function_get_PRODUCTOS();
  }


  public function_get_PRODUCTOS(){
    this.http._getProducto_().subscribe((resp:any)=>{
       this.list=resp.products;
       console.log(this.list);
    })
  }
  
}
