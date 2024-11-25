import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { PedidoComponent } from './carrito/pedido/pedido.component';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PedidoComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CarritomModule { }
