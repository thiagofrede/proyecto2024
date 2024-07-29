import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS DEL MÓDULO PRODUCTO
import { AuricularesComponent } from './pages/auriculares/auriculares.component';
import { CelularesComponent } from './pages/celulares/celulares.component';
import { TecladosComponent } from './pages/teclados/teclados.component';
import { MousesComponent } from './pages/mouses/mouses.component';


@NgModule({
  declarations: [
    AuricularesComponent,
    CelularesComponent,
    TecladosComponent,
    MousesComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
