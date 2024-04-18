import { Injectable } from '@angular/core';

const TOKEN = 'street-token';
const USUARIO = 'street-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void{
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  public saveUsuario(usuario): void{
    window.localStorage.removeItem(USUARIO);
    window.localStorage.setItem(USUARIO, JSON.stringify(usuario));
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  static getUsuario(): any{
    return JSON.parse(localStorage.getItem(USUARIO));
  }

  static getDocumentoIdentidad(): string{
    const usuario = this.getUsuario();
    if ( usuario == null ){
      return '';
    }
    return usuario.DocumentoIdentidad;
  }

  static getTipoPerfil(): string{
    const usuario = this.getUsuario();
    if ( usuario == null ){
      return '';
    }
    return usuario.tipoPerfil;
  }

  static isAdminLoggedIn(): boolean{
    const token = this.getToken();
    if(token === null){
      return false;
    }
    const tipoPerfil: string = this.getTipoPerfil();
    return tipoPerfil == 'ADMINISTRADOR';
  }

  static isClienteLoggedIn(): boolean{
    const token = this.getToken();
    if(token === null){
      return false;
    }
    const tipoPerfil: string = this.getTipoPerfil();
    return tipoPerfil == 'CLIENTE';
  }

  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USUARIO);
  }
}
