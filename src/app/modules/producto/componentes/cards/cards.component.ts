import { Component,Input, Output, EventEmitter  } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { CarritoService } from 'src/app/modules/carrito/service/carrito.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
    // Definimos colección local de productos
    coleccionProductos: Producto[] = [];
  
    // Variable local para obtener producto seleccionado
    productoSeleccionado!: Producto;
  
    // Variable para manejar estado de un modal
    modalVisible: boolean = false;
    //debajo del modalvisible
compravisible:boolean = false

//directiva para comunicarse con el componente padre

@Input() productoReciente: string ='';


//@output sera definido como un nuevo evento
@Output() productoAgregado= new EventEmitter<Producto>;
  
Stock:number = 0;
constructor(
  public servicioCrud: CrudService,
  public servicioCarrito:CarritoService
){}
    
    ngOnInit(): void{
      this.servicioCrud.obtenerProducto().subscribe(producto => {
        this.coleccionProductos = producto;
      })
    }
  
    // Función para modal que muestre la información de un producto en específico
    mostrarVer(info: Producto){
      // Habilita visibilidad del modal
      this.modalVisible = true;
  
      // Guarda información de un producto elegido por el usuario
      this.productoSeleccionado = info;
    }
    //abajo de la llave dde this.productoseleccionado
agregarProducto(info:Producto){
  this.productoAgregado.emit(info);

  this.compravisible = true;
  const stockDeseado = Math.trunc(this.Stock);
  //Controla el stock que desea el comprador
  if (stockDeseado<=0 || stockDeseado > info.Stock) {
    Swal.fire({
      title:'Error al agregar el producto',
      text:'El stock ingresado no es valido, por favor ingresar un valor valido',
      icon:'error'
    })
  }else{
    this.servicioCarrito.crearPedido(info,stockDeseado);
  }
}
  
}
