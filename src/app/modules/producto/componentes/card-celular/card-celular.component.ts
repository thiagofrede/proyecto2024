import { Component } from '@angular/core';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-card-celular',
  templateUrl: './card-celular.component.html',
  styleUrls: ['./card-celular.component.css']
})
export class CardCelularComponent {
 // Colección de todos los productos
 coleccionProductos: Producto[] = [];

 // Colección de sólo productos de categoría "auriculares"
 coleccionCelulares: Producto[] = [];

 productoSeleccionado!: Producto;

 modalVisible: boolean = false;

 constructor(public servicioCrud: CrudService){}

 ngOnInit(): void{
   this.servicioCrud.obtenerProducto().subscribe(Producto => {
     this.coleccionProductos = Producto;

     // mostrar la colección actual de auriculares
     this.mostrarProductoCelulares();
   })
 }

 // Función para filtrar los productos que sean del tipo "Auriculares"
 mostrarProductoCelulares(){
   // forEach: itera la colección
   this.coleccionProductos.forEach(Producto => {
     // Si la categoría del producto es igual a "auriculares", se enviará a la 
     // colección de juguetes específicada

     if(Producto.Categoria === "Celulares"){
       // .push: sube o agrega un item a una colección
       this.coleccionCelulares.push(Producto);
     }
   })
 }

 // Muestra información completa de un producto elegido por el usuario
 mostrarVer(info: Producto){
   this.modalVisible = true;

   this.productoSeleccionado = info;
 }

 //filtro
 
}
