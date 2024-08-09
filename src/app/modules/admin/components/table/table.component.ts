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

//variable va a tomar el producto que nosotros elijimos
productoSeleccionado!: Producto; //<- recibe valores vacios


//Definimos formulario para los productos
/*
*Atributos alfanumericos (string) se inicializan con comillas simples
*atributos numericos (number) se inicializan con cero ('0')
*/

producto = new FormGroup({
  nombre: new FormControl('',Validators.required),
  precio:new FormControl(0,Validators.required),
  descripcion:new FormControl('',Validators.required),
  categoria:new FormControl('',Validators.required),
  imagen:new FormControl('',Validators.required),
  alt:new FormControl('',Validators.required),
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
      Nombre: this.producto.value.nombre!,
      Descripcion: this.producto.value.descripcion!,
      Precio: this.producto.value.precio!,
      Categoria: this.producto.value.categoria!,
      Imagen: this.producto.value.imagen!,
      Alt: this.producto.value.alt!,
    }

    await this.servicioCrud.crearProducto(nuevoProducto)
    .then(producto => {
      alert ("ha agregado un nuevo producto con exito :)");
    })
    .catch(error =>{
      alert("hubo un problema al agregar un problema :(");
    })
  }
 }

//funcion para alertar al usuario del producto que desea eliminar
  mostrarBorrar(productoSeleccionado: Producto){
    //abre el modal
  this.modalVisibleProducto = true; 
  //toma los valores del producto elegido
  this.productoSeleccionado = productoSeleccionado;
 }

 //funcion para eliminar definitivamente al producto
 borrarProducto(){
  this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto)
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
  // el ID no se vuelve a enviar ni se modifica, por ende no lo llamas
  this.producto.setValue({
    nombre:productoSeleccionado.Nombre,
    precio:productoSeleccionado.Precio,
    descripcion:productoSeleccionado.Descripcion,
    categoria:productoSeleccionado.Categoria,
    imagen: productoSeleccionado.Imagen,
    alt:productoSeleccionado.Alt,

  })
 }

//funcion para editar el producto
 editarProducto(){

  let datos: Producto = {
    idProducto: this.productoSeleccionado.idProducto,
    Nombre:this.producto.value.nombre!,
    Precio:this.producto.value.precio!,
    Descripcion:this.producto.value.descripcion!,
    Categoria:this.producto.value.categoria!,
    Imagen: this.producto.value.imagen!,
    Alt: this.producto.value.alt!,
  }

  //esto se tiene que modificar con sweefalert (hacerlo en la proxima clase pq no llegas)
  this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
  .then(producto =>{
    alert("El producto fue modificado con exito.");
  })
  .catch(error => {
    alert("hubo un problema al modificar el producto")
  })
 }
}

//cuando se ejecuta un bloque thech o un cath (pregunta para el examen)
