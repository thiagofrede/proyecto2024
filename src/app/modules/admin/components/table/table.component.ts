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
  //creamos coleccion local de productos -> definimos como array
coleccionProductos: Producto[]=[];

//variable para manejar el estado de edicion y eliminacion de productos
modalVisibleProducto: boolean= false;


nombreImagen!: string; // obtendrá el nombre de la imagen
Imagen!: string; // obtendrá la ruta de la imagen

//variable va a tomar el producto que nosotros elijimos
productoSeleccionado!: Producto; //<- recibe valores vacios


//Definimos formulario para los productos
/*
*Atributos alfanumericos (string) se inicializan con comillas simples
*atributos numericos (number) se inicializan con cero ('0')
*/

producto = new FormGroup({
  Nombre: new FormControl('',Validators.required),
  Precio:new FormControl(0,Validators.required),
  Descripcion:new FormControl('',Validators.required),
  Categoria:new FormControl('',Validators.required),
  //imagen:new FormControl('',Validators.required),
  Alt:new FormControl('',Validators.required),
})


constructor(public servicioCrud: CrudService){}

ngOnInit(): void{
  //sucribe -> notifica constantemente los cambios actuales del sistema
this.servicioCrud.obtenerProducto().subscribe(producto =>{
   this.coleccionProductos = producto;
  })
 }


 async agregarProducto(){
  if(this.producto.valid){
    let nuevoProducto: Producto = {
      //idProducto no se toma porque es generado  por la BD y no por el usuario
      idProducto: '',
      //el resto si se toma porque es generado por el usuario
      Nombre: this.producto.value.Nombre!,
      Descripcion: this.producto.value.Descripcion!,
      Precio: this.producto.value.Precio!,
      Categoria: this.producto.value.Categoria!,
      Imagen: '',
      Alt: this.producto.value.Alt!,
    }




 // Enviamos nombre y url de la imagen; definimos carpeta de imágenes como "productos"
 await this.servicioCrud.subirImagen(this.nombreImagen, this.Imagen, "productos")
 .then(resp => {
   // encapsulamos respuesta y envíamos la información obtenida
   this.servicioCrud.obtenerUrlImagen(resp)
     .then(url => {
       // ahora método crearProducto recibe datos del formulario y URL creada
       this.servicioCrud.crearProducto(nuevoProducto, url)
         .then(producto => {
           alert("Ha agregado un nuevo producto con éxito.");

           // Resetea el formulario y las casillas quedan vacías
           this.producto.reset();
         })
         .catch(error => {
           alert("Ha ocurrido un error al cargar un producto.");

           this.producto.reset();
         })
     })
 })
}
}


 



  // ELIMINAR PRODUCTOS
  // función vinculada al modal y el botón de la tabla
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;

    this.productoSeleccionado = productoSeleccionado;
  }


 //funcion para eliminar definitivamente al producto
 borrarProducto(){
    /*
      Ahora envíamos tanto el ID del producto (para identificarlo en Firestore)
      y la URL de la imagen (para identificarlo en Storage)
      ID y URL <- identificadores propios de cada archivo en la Base de Datos
    */
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto,this.productoSeleccionado.Imagen)
  .then(respuesta => {
    alert("el producto se ha eliminado correctamente.")
  })
  .catch(error => {
    alert("no se ha podido eliminar el producto /n" +error)
  })
 }

 //funcion para seleccionar el producto
 mostrarEditar(productoSeleccionado: Producto){
  this.productoSeleccionado = productoSeleccionado;


  //enviar o "setear" los nuevos valores y reasignarls a las variables
  //autocompletar en el formulario del modal
  //(menos el ID y la URL de la imagen)
  this.producto.setValue({
    Nombre: productoSeleccionado.Nombre,
    Precio: productoSeleccionado.Precio,
    Descripcion: productoSeleccionado.Descripcion,
    Categoria: productoSeleccionado.Categoria,
     // imagen: productoSeleccionado.imagen,
    Alt: productoSeleccionado.Alt,
    
  })
 }

//funcion para editar el producto
 
  editarProducto() {
    let datos: Producto ={
      // Enviar o "setear" los nuevos valores y reasignarlos a las variables
      // El ID no se vuelve a enviar ni se modifica, por ende no lo llamamos
      idProducto: this.productoSeleccionado.idProducto,


      Nombre: this.producto.value.Nombre!,
      Precio: this.producto.value.Precio!,
      Descripcion: this.producto.value.Descripcion!,
      Categoria: this.producto.value.Categoria!,
      Imagen: this.productoSeleccionado.Imagen,
      Alt: this.producto.value.Alt!,
    }
     
    // Verificamos que el usuario ingrese una nueva imagen o no
    if(this.Imagen){
      this.servicioCrud.subirImagen(this.nombreImagen, this.Imagen, "productos")
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

  // ACTUALIZAR la información ya existente de los productos
  actualizarProducto(datos: Producto){

  //esto se tiene que modificar con sweefalert (hacerlo en la proxima clase pq no llegas)
  this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
  .then(producto =>{
    alert("El producto fue modificado con exito.");
  })
  .catch(error => {
    alert("hubo un problema al modificar el producto")
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
          this.Imagen = url.toString();
        }
      }
    }
  }
}



//cuando se ejecuta un bloque thech o un cath (pregunta para el examen)
