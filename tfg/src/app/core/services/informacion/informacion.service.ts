import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Informacion, Tipo } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  informacionURL = 'http://localhost:8080/api/informacion/';

  constructor(private httpClient: HttpClient) { }

  public getInformacion(): Observable<Informacion[]> {
    return this.httpClient.get<Informacion[]>(this.informacionURL+'lista');
  }

  public getInformacionPorTipo(tipo: String): Observable<Informacion[]> {
    return this.httpClient.get<Informacion[]>(this.informacionURL + `detalle/${tipo}`);
  }

  public getInformacionPorId(id: number): Observable<Informacion> {
    return this.httpClient.get<Informacion>(this.informacionURL + `detalle/${id}`);
  }

  public crearInformacion(informacion: Informacion, id: number): Observable<any> {
    console.log(informacion);
    return this.httpClient.post<any>(this.informacionURL + `nuevo/${id}`, informacion);
  }

  public editarInformacion(informacion: Informacion, id: number): Observable<any> {
    return this.httpClient.put<any>(this.informacionURL + `actualizar/${id}`, informacion);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.informacionURL + `borrar/${id}`);
  } 
}
