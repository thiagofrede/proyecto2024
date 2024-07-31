import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //creamos coleccion local de productos -> definimos como array
coleccionProductos: Producto[]=[];


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
}
