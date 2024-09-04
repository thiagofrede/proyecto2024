import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

//string que modificaria el valor del @input en el componente fijo
product: string= '';


//coleccion de productos añadidos a la lista
productoCarrusel: Producto[]=[];

productoAnadido(producto:Producto){

  //modificador de valor de 'product'
  this.product = `${producto.Nombre}: $${producto.Precio}`; 

  try{
    /*aregamos la informacion por el parametro de la funcion a a coleccion de carrusel */
    this.productoCarrusel.push(producto);

    Swal.fire({
      title:'felicitaciones',
      text:'ha añadido este producto con exito',
      icon:'info'
    })

  }catch(error){
    Swal.fire({
      title:'hubo un error',
      text:'no se pudo añadir con exito el producto\n'+error,
      icon:'error'
    })
  }
}

}
