import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
//si  no aparecen los componentes de material en los cards es pq no lo importamos y exportamos en el module.ts
// COMPONENTES DE MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

// VISTAS DEL MÓDULO PRODUCTO
import { AuricularesComponent } from './pages/auriculares/auriculares.component';
import { CelularesComponent } from './pages/celulares/celulares.component';
import { TecladosComponent } from './pages/teclados/teclados.component';
import { MousesComponent } from './pages/mouses/mouses.component';

//vistas del modulo tabla
import { TableComponent } from '../admin/components/table/table.component';
//componentes locales

import { ProductosComponent } from './pages/productos/productos.component';
import { CardsComponent } from './componentes/cards/cards.component';
import { InicioModule } from "../inicio/inicio.module";

//Componentes locales


@NgModule({
  declarations: [
    AuricularesComponent,
    CelularesComponent,
    TecladosComponent,
    MousesComponent,
    ProductosComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatButtonModule,
    MatCardModule,
    InicioModule
],
  exports:[
    MatButtonModule,
    MatCardModule,
    AuricularesComponent,
    CelularesComponent,
    TecladosComponent,
    MousesComponent,
    ProductosComponent,
    CardsComponent,
  ]
})
export class ProductoModule { }
