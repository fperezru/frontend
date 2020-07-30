import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diario } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  diarioURL = 'http://localhost:8080/api/diario/';

  constructor(private httpClient: HttpClient) { }

  public getDiarioUser(id: Number): Observable<Diario[]> {
    return this.httpClient.get<Diario[]>(this.diarioURL+ `lista/${id}`);
  }

  public crearPagina(diario: Diario, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.diarioURL + `nuevo/${id}`, diario);
  }

  public editarPagina(diario: Diario, id: number): Observable<any> {
    return this.httpClient.put<any>(this.diarioURL + `actualizar/${id}`, diario);
  }
}
