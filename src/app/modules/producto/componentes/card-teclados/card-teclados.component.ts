import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-teclados',
  templateUrl: './card-teclados.component.html',
  styleUrls: ['./card-teclados.component.css']
})
export class CardTecladosComponent {

  
  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  // Colección de sólo productos de categoría "auriculares"
  coleccionTeclados: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(Producto => {
      this.coleccionProductos = Producto;

      // mostrar la colección actual de auriculares
      this.mostrarProductoTeclados();
    })
  }

  // Función para filtrar los productos que sean del tipo "teclados"
  mostrarProductoTeclados(){
    // forEach: itera la colección
    this.coleccionProductos.forEach(Producto => {
      // Si la categoría del producto es igual a "teclados", se enviará a la 
      // colección de juguetes específicada

      if(Producto.Categoria === "Teclados"){
        // .push: sube o agrega un item a una colección
        this.coleccionTeclados.push(Producto);
      }
    })
  }

  // Muestra información completa de un producto elegido por el usuario
  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
  
}
