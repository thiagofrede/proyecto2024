import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { CarritoService } from '../../service/carrito.service';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  productos:Pedido[] = [];
  
  constructor(
    public servicioCarrito:CarritoService,
    public servicioAuth: AuthService
  ){}
  
  //Obtenemos el rol e ID del usuario para verificar que este logueado correctamente
  ngOnInit(){
    this.servicioAuth.obtenerUid().then(uid => {
      if (uid) {
        this.servicioAuth.ObtenerRol(uid).subscribe(rol => {
          if (rol === 'usuario') {
            //Inicializamos el carrito
            this.servicioCarrito.iniciarCart();
            
            this.servicioCarrito.obtenerCarrito().subscribe(producto =>
              this.productos = producto
            );
          }
        })
      }
    })
  }
  
  
  quitarPedido(pedido:Pedido){
    this.servicioCarrito.borrarPedido(pedido);
  }
}
