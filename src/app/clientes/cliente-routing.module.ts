import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { TableroComponent } from './components/tablero/tablero.component';

const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: 'tablero', component: TableroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
