import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path:"admin", component:AdminComponent
  },
  {
    path:"table", component:TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
