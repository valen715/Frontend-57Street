import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { PostCategoriaComponent } from './components/post-categoria/post-categoria.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'tablero', component: TableroComponent },
  { path: 'categoria', component: PostCategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
