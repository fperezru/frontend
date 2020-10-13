import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario } from 'src/app/core/clases/clases';
import { Observable } from 'rxjs';
import { JwtModel } from 'src/app/core/clases/clases';
import { NuevoUsuario } from 'src/app/core/clases/clases';

const cabecera = {headers: new HttpHeaders({'Content-Type': ''})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8080/api/auth/';
  private authURL1 = 'http://192.168.0.21:8080/api/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL1 + 'login', usuario);
  }

  public getUser(nombreUsuario: String): Observable<any> {
    return this.httpClient.get<any>(this.authURL1 + `user/${nombreUsuario}`, cabecera);
  }

  public getUserById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.authURL1 + `usuario/${id}`, cabecera);
  }

  public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL1 + 'nuevo', usuario);
  }
}