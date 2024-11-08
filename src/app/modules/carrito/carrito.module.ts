import { Injectable } from '@angular/core';
import { CrudService } from '../admin/services/crud.service';
import { AuthService } from '../autentificacion/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Producto } from 'src/app/models/producto';
import { Pedido } from 'src/app/models/pedido';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  Pedido:Pedido = {
    idPedido: '',
    producto: {
      idProducto: '',
      Nombre: '',
      Precio: 0,
      Descripcion: '',
      Categoria: '',
      Imagen: '',
      Alt: '',
      Stock: 0
    },
    cantidad: 0,
    total: 0
  }

  private pedidosColeccion: AngularFirestoreCollection<Pedido>

  private uid: string | null = null;

  constructor(
    private servicioCrud:CrudService,
    private servicioAuth:AuthService,
    private servicioFirestore:AngularFirestore
  ) {
    //Creamos un subcoleccion dentro de la coleccion de usuarios y le damos ese valor a pedidosColeccion
    this.pedidosColeccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`);
  }

  //Funcion para inicializar el carrito
  iniciarCart(){
    this.servicioAuth.obtenerUid().then(uid => {
      //Obtenemos el ID del usuario para la subcoleccion
      this.uid = uid
      if(this.uid){
        console.log(this.uid);
      }else{
        console.error('No se obtuvo el UID');
      }
    });
  }

  obtenerCarrito(){
    return this.pedidosColeccion.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }

  crearPedido(producto:Producto, stock:number){
    try {
      //Creamos un ID para el pedido que sera subido
      const idPedido = this.servicioFirestore.createId();

      //Reemplazamos los valores de pedido por los valores que obtuvimos
      this.Pedido.idPedido = idPedido;
      this.Pedido.producto = producto;
      this.Pedido.cantidad = stock;
      this.Pedido.total = producto.Precio*stock;

      
      this.pedidosColeccion.doc(idPedido).set(this.Pedido);
    } catch (error) {
      Swal.fire({
        title:'¡Oh no!',
        text:'Ha ocurrido un error al subir su producto',
        icon:'error'
      })


}
}
 borrarPedido(pedido:Pedido){
  try{
    this.pedidosColeccion.doc(pedido.idPedido).delete();
    Swal.fire({
      text:'Ha borrado su pedido con exito',
      icon:'info'
    })
  }catch(error){
    Swal.fire({
      
    })


  }
 }
}