import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODAS LAS VISTAS DEL MÓDULO PRODUCTO
import { AuricularesComponent } from './pages/auriculares/auriculares.component';
import { CelularesComponent } from './pages/celulares/celulares.component';
import { TecladosComponent } from './pages/teclados/teclados.component';
import { MousesComponent } from './pages/mouses/mouses.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {
    path:"Auriculares",component:AuricularesComponent
  },
  {
    path:"Celulares",component:CelularesComponent
  },
  {
    path:"Teclados",component:TecladosComponent
  },
  {
    path:"Mouses",component:MousesComponent
  },
  {
    path:"Productos", component:ProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
