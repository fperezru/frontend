import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, Rol } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuarioURL = 'http://localhost:8080/api/usuarios/';

  constructor(private httpClient: HttpClient) { }

  public getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL+'lista');
  }

  public getFamiliares(rol: Rol): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL + `lista/${rol}`);
  }

  public getPacientes(familiar: number): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL + `familiar/${familiar}`);
  }
}
