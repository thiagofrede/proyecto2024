import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {map} from 'rxjs'

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
   //obtener producto
   obtenerProducto(){
    //snapshotChanges => toma una captura del estado de los datos 
    //pipe=> funciona como una tuberia que retorna el nuevo arreglo de datos
    //map => "mapea" o recorre esa informacion
    //a ->resguarda la nueva informacion y la envia
    return this.productocollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
   }

   //editar producto
   modificarProducto(idProducto: string, nuevaData: Producto){

    //accedemos a la coleccion, buscamos por ID y actualizamos informacion
    return this.basedatos.collection('producto').doc(idProducto).update(nuevaData);
   }



   //eliminar producto
   eliminarProducto(idProducto: string){
    return new Promise((resolve, reject)=>{
      try{
        // accedo a la coleccion, busco su id y lo elimino
        const respuesta = this.productocollection.doc(idProducto).delete();
        resolve(respuesta);
      }
      catch(error){
        reject(Error);
      }
    })
   }
}
