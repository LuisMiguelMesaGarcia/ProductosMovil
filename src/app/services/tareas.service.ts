import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tareasCollection: any[] = [];

  key = 'collection';

  constructor() { }

  postTarea(tarea: any){
    tarea.isDone = false;

    let value = localStorage.getItem(this.key);

    if(value === null || value === undefined){
      this.tareasCollection.push(tarea)
      localStorage.setItem(this.key, JSON.stringify(this.tareasCollection))
    }else{
      let collection: any[] = JSON.parse(value);
      collection.push(tarea);
      localStorage.setItem(this.key, JSON.stringify(collection))
    }

  }

  editarTarea(tarea: any, input: any){
    let value = localStorage.getItem(this.key);

    if(value === null || value === undefined){
      return;
    }else{
      let collection: any[] = JSON.parse(value);
      collection.forEach(item=>{
        if(item.name == tarea.name){
          item.name = input.name;
        }
      })
      localStorage.setItem(this.key, JSON.stringify(collection));
    }
  }

  getTareas(){
    let value = localStorage.getItem(this.key);
    if(value === null || value === undefined){
     return [];
    }else{
      let collection: any[] = JSON.parse(value);
      return collection;
    }

    
  }

  updateTarea(task: any){
    let value = localStorage.getItem(this.key);

    if(value === null || value === undefined){
      return;
    }else{
      let collection: any[] = JSON.parse(value);
      collection.forEach(item=>{
        if(item.name == task.name){
          item.isDone = task.isDone;
        }
      })
      localStorage.setItem(this.key, JSON.stringify(collection));
    }
  }
  

}
