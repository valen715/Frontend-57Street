import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'clientes', loadChildren: () => import('./clientes/cliente.module').then(m => m.ClienteModule) },
{ path: 'admin', loadChildren: () => import('./administrador/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
