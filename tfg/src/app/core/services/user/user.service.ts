import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, Rol } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuarioURL = 'http://localhost:8080/api/usuarios/';
  private url2 = 'http://192.168.1.34:8080/api/usuarios/';

  constructor(private httpClient: HttpClient) { }

  public getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url2+'lista');
  }

  public getFamiliares(rol: number): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url2 + `lista/${rol}`);
  }

  public getPacientes(familiar: number): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url2 + `familiar/${familiar}`);
  }

  public editarUsuario(usuario: Usuario, id: number): Observable<any> {
    return this.httpClient.put<any>(this.url2 + `actualizar/${id}`, usuario);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url2 + `borrar/${id}`);
  } 
}
