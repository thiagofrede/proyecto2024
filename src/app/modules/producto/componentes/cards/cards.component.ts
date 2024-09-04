import { Component,Input, Output, EventEmitter  } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
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
  
    constructor(public servicioCrud: CrudService){}
    
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
}
  
}
