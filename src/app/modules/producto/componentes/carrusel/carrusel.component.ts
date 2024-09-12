import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  //String que modificara el valor de @Input en el componente hijo
  product: string = '';

  //Coleccion de productos añadidos a la lista
  productoCarrusel: Producto[] = [];

  auriculares:boolean = false;

  general:boolean = true;

  productoAnadido(producto: Producto) {

    //Modificador del valor de 'product'
    this.product = `${producto.Nombre} : $${producto.Precio}`;

    try {
      /*Agregamos la informacion por el 
      parametro de la funcion a la coleccion
      de carrusel*/
      this.productoCarrusel.push(producto);

      Swal.fire({
        title: 'Bien',
        text: 'Ha añadido este producto con exito',
        icon: 'info'
      });
    } catch (error) {
      Swal.fire({
        title: '¡Oh no!',
        text: 'Ha ocurrido un error\n'+error,
        icon: 'error'
      });
    }
  }
}
