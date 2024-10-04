import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-mouses',
  templateUrl: './card-mouses.component.html',
  styleUrls: ['./card-mouses.component.css']
})
export class CardMousesComponent {

  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  // Colección de sólo productos de categoría "auriculares"
  coleccionAuriculares: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(Producto => {
      this.coleccionProductos = Producto;

      // mostrar la colección actual de auriculares
      this.mostrarProductoAuriculares();
    })
  }

  // Función para filtrar los productos que sean del tipo "Auriculares"
  mostrarProductoAuriculares(){
    // forEach: itera la colección
    this.coleccionProductos.forEach(Producto => {
      // Si la categoría del producto es igual a "auriculares", se enviará a la 
      // colección de juguetes específicada

      if(Producto.Categoria === "auriculares"){
        // .push: sube o agrega un item a una colección
        this.coleccionAuriculares.push(Producto);
      }
    })
  }

  // Muestra información completa de un producto elegido por el usuario
  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}
