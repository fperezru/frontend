import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OtrosRecuerdos } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class OtroService {

  otroURL = 'http://localhost:8080/api/otros/';

  constructor(private httpClient: HttpClient) { }

  public getRecuerdos(): Observable<OtrosRecuerdos[]> {
    return this.httpClient.get<OtrosRecuerdos[]>(this.otroURL+'lista');
  }

  public getRecuerdoPorId(id: number): Observable<OtrosRecuerdos> {
    return this.httpClient.get<OtrosRecuerdos>(this.otroURL + `detalle/${id}`);
  }

  public getRecuerdosPorUser(id: Number): Observable<OtrosRecuerdos[]> {
    return this.httpClient.get<OtrosRecuerdos[]>(this.otroURL + `lista/${id}`);
  }

  public crearRecuerdo(recuerdo: OtrosRecuerdos, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.otroURL + `nuevo/${id}`, recuerdo);
  }

  public editarRecuerdo(recuerdo: OtrosRecuerdos, id: number): Observable<any> {
    return this.httpClient.put<any>(this.otroURL + `actualizar/${id}`, recuerdo);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.otroURL + `borrar/${id}`);
  } 
}
