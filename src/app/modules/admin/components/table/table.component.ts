import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import {FormControl, FormGroup,  Validators} from '@angular/forms'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
   // Crear colección de productos del tipo producto -> lo definimos como un array
   coleccionProductos: Producto[] = [];

   // Variable para manejar el estado de Edición y Eliminación de productos
   modalVisibleProducto: boolean = false;
 
   // Variable va a tomar el producto que nosotros elijamos
   productoSeleccionado!: Producto; // <- recibe valores vacíos
 
   nombreImagen!: string; // Obtendrá el nombre de la imagen
 
   imagen!: string; // Obtendrá la ruta de la imagen
 
   // Definimos formulario para los productos
   /**
    * Atributos alfanuméricos (string) se inicializan con comillas simples
    * Atributos numéricos (number) se inicializan con cero ('0')
    */
   producto = new FormGroup({
     nombre: new FormControl('', Validators.required),
     precio: new FormControl(0, Validators.required),
     descripcion: new FormControl('', Validators.required),
     categoria: new FormControl('', Validators.required),
     // imagen: new FormControl('', Validators.required),
     alt: new FormControl('', Validators.required)
   })
 
   constructor(public servicioCrud: CrudService) { }
 
   ngOnInit(): void {
     // subscribe -> notifica constantemente los cambios actuales del sistema
     this.servicioCrud.obtenerProducto().subscribe(producto => {
       // guarda la información recibida como un nuevo "producto" a la colección
       this.coleccionProductos = producto;
     })
   }
 
   async agregarProducto() {
     // validamos los valores del producto agregado
     if (this.producto.valid) {
       let nuevoProducto: Producto = {
         // idProducto no se toma porque es generado por la BD y no por el usuario
         idProducto: '',
         // el resto es tomado con información ingresada por el usuario
         Nombre: this.producto.value.nombre!,
         Descripcion: this.producto.value.descripcion!,
         Precio: this.producto.value.precio!,
         Categoria: this.producto.value.categoria!,
         // imagen ahora toma la URL generada desde Storage
         Imagen: '',
         Alt: this.producto.value.alt!
       }
 
       // Enviamos nombre y url de la imagen; definimos carpeta de imágenes como "productos"
       await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
         .then(resp => {
           // Encapsulamos respuesta y envíamos la información obtenida
           this.servicioCrud.obtenerUrlImagen(resp)
             .then(url => {
               // Ahora método crearProducto recibe los datos del formulario y la URL formateada
               this.servicioCrud.crearProducto(nuevoProducto, url)
                 .then(producto => {
                   alert("Ha agregado un nuevo producto con éxito :)");
 
                   // Limpiamos formulario para agregar nuevos productos
                   this.producto.reset();
                 })
                 .catch(error => {
                   alert("Hubo un problema al agregar un nuevo producto :(");
 
                   this.producto.reset();
                 })
             })
         })
     }
   }
 
   // Función para alertar al usuario del producto que desea eliminar
   mostrarBorrar(productoSeleccionado: Producto) {
     // abre el modal
     this.modalVisibleProducto = true;
 
     // toma los valores del producto elegido
     this.productoSeleccionado = productoSeleccionado;
   }
 
   // Función para eliminar definitivamente al producto
   borrarProducto() {
     // Envía ID del producto eliminado y la ubicación en el almacenamiento de STORAGE
     this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.Imagen)
       .then(respuesta => {
         alert("El producto se ha eliminado correctamente.")
       })
       .catch(error => {
         alert("No se ha podido eliminar el producto \n" + error);
       })
   }
 
   // Función para seleccionar el producto a editar
   mostrarEditar(productoSeleccionado: Producto) {
     this.productoSeleccionado = productoSeleccionado;
 
     // Enviar o "setear" los nuevos valores y reasignarlos a las variables
     // El ID no se vuelve a enviar ni se modifica, por ende no lo llamamos
     this.producto.setValue({
       nombre: productoSeleccionado.Nombre,
       precio: productoSeleccionado.Precio,
       descripcion: productoSeleccionado.Descripcion,
       categoria: productoSeleccionado.Categoria,
       // imagen: productoSeleccionado.imagen,
       alt: productoSeleccionado.Alt
     })
   }
 
   editarProducto() {
     let datos: Producto = {
       // Solo el ID toma y deja igual su valor
       idProducto: this.productoSeleccionado.idProducto,
       Nombre: this.producto.value.nombre!,
       Precio: this.producto.value.precio!,
       Descripcion: this.producto.value.descripcion!,
       Categoria: this.producto.value.categoria!,
       /* Imagen toma información desde el servicio, no del formulario */
       Imagen: this.productoSeleccionado.Imagen,
       Alt: this.producto.value.alt!
     }
 
     // Verificamos que el usuario ingrese una nueva imagen o no
     if(this.imagen){
       this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "producto")
       .then(resp => {
         this.servicioCrud.obtenerUrlImagen(resp)
         .then(url => {
           // Actualizamos URL de la imagen en los datos del formulario
           datos.Imagen = url;
 
           // Actualizamos los datos desde el formulario de edición
           this.actualizarProducto(datos);
 
           // Vaciamos casillas del formulario
           this.producto.reset();
         })
         .catch(error => {
           alert ("Hubo un problema al subir la imagen :( \n"+error);
 
           this.producto.reset();
         })
       })
     }else{
       /*
         Actualizamos formulario con los datos recibidos del usuario, pero sin modificar la
         imagen ya existente en Firestore y Storage
       */
       this.actualizarProducto(datos);
     }
   }
 
   // ACTUALIZA la información ya existente de los productos
   actualizarProducto(datos: Producto){
     this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
       .then(producto => {
         alert("El producto fue modificado con éxito.");
       })
       .catch(error => {
         alert("Hubo un problema al modificar el producto.");
       })
   }
 
   // Método para CARGAR IMÁGENES
   cargarImagen(event: any){
     // Variable para obtener el archivo subido desde el input del HTML
     let archivo = event.target.files[0];
 
     // Variable para crear un nuevo objeto de tipo "archivo" o "file" y poder leerlo
     let reader = new FileReader();
 
     if (archivo != undefined){
       /*
         Llamamos a método readAsDataUrl para leer toda la información recibida.
         Enviamos como parámetro el archivo porque será el encargado de tener la info. 
         ingresada por el usuario
       */
       reader.readAsDataURL(archivo);
 
       // Definimos qué haremos con la información mediante función flecha
       reader.onloadend = () => {
         let url = reader.result;
 
         // Verificamos que la URL sea existente y diferente a "nula"
         if(url != null){
           // Definimos nombre de la imagen con atributo "name" del input
           this.nombreImagen = archivo.name;
 
           // Definimos ruta de la imagen según URL recibida en formato cadena (string)
           this.imagen = url.toString();
         }
       }
     }
   }
}



//cuando se ejecuta un bloque thech o un cath (pregunta para el examen)
