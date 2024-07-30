import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({ 
  providedIn: 'root'
})
export class CrudService {
private productocollection: AngularFirestoreCollection <Producto>

  constructor(private basedatos: AngularFirestore ) {
    this.productocollection = basedatos.collection('producto')
   }

   //crear producto
   crearProducto(producto: Producto){
    return new Promise(async(resolve, reject)=>{
      try{
        //creamos numerro de identificacion para el producto en la base de datos
        const idProducto = this.basedatos.createId();
        //asignamos un id creado al atributo idProducto de la interfaz producto
        producto.idProducto = idProducto
        
        const resultado = await this.productocollection.doc(idProducto).set(producto);

        resolve(resultado);
      }catch(error){
        reject(error);
      }
    })
   }
}
