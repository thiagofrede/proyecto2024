import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
@Component({
  selector: 'app-auriculares',
  templateUrl: './auriculares.component.html',
  styleUrls: ['./auriculares.component.css']
})
export class AuricularesComponent {



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
constructor(public servicioCrud: CrudService) {
  // Inicialización desde el servicio
  this.servicioCrud.obtenerProducto().subscribe(producto => {
    this.coleccionProductos = producto;
  });
  
      // Inicialización de `info`
      
  }

  ngOnInit(): void {
    // Esta parte ya se maneja en el constructor al suscribirse al servicio
  }

  mostrarVer(info: Producto): void {
    this.modalVisible = true;
    this.productoSeleccionado = info;
  }

  agregarProducto(info: Producto): void {
    this.productoAgregado.emit(info);
    this.compravisible = true;
  }
}
