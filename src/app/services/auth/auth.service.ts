import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient,
    private userStorageService: UserStorageService) { }

  registrar(signupRequest:any): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", signupRequest);
  }

  login(email: string, clave: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {email, clave};

    return this.http.post(BASIC_URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
      map((response =>{
        const token = response.headers.get('Authorization').substring(7);
        const usuario = response.body;
        console.log("token", token)
        console.log("usuario", usuario)
        if(token && usuario){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUsuario(usuario);

          return true;
        }
        return false;
      }))
    )
  }
}
