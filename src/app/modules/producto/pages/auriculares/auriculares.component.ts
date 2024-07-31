import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
@Component({
  selector: 'app-auriculares',
  templateUrl: './auriculares.component.html',
  styleUrls: ['./auriculares.component.css']
})
export class AuricularesComponent {
  public info: Producto[];
  
   constructor(){
     this.info = [
       {
         idProducto: "",
         Nombre:"",
         Precio:0,
         Descripcion:"",
         Categoria:"",
         Imagen:"./assets/cardsauriculares/a.inalm1.png",
         Alt:"",
       },
       {
        idProducto: "",
         Nombre:"",
         Precio:0,
         Descripcion:"",
         Categoria:"",
         Imagen:"./assets/cardsauriculares/a.inalm2.png",
         Alt:"",
       },
       {
        idProducto: "",
         Nombre:"",
         Precio:0,
         Descripcion:"",
         Categoria:"",
         Imagen:"./assets/cardsauriculares/a.inalm3.png",
         Alt:"",
       },
       {
        idProducto: "",
         Nombre:"",
         Precio:0,
         Descripcion:"",
         Categoria:"",
         Imagen:"./assets/cardsauriculares/a.inalm4.png",
         Alt:"",
      },
      {
        idProducto: "",
        Nombre:"",
        Precio:0,
        Descripcion:"",
        Categoria:"",
        Imagen:"./assets/cardsauriculares/a.inalm5.png",
        Alt:"",
      },
      {
        idProducto: "",
         Nombre:"",
         Precio:0,
         Descripcion:"",
         Categoria:"",
         Imagen:"./assets/cardsauriculares/a.inalm6.png",
         Alt:"",
      }
     ]
   }
}
