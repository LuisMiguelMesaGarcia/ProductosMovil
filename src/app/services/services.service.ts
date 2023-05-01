import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class SERVICESService {

  constructor(public http:HttpClient) { }

  public _getProducto_(){
    return this.http.get('https://dummyjson.com/products');
  }

}
