import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Informacion, Tipo } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  informacionURL = 'http://localhost:8080/api/informacion/';
  informacionURL1 = 'http://192.168.0.21:8080/api/informacion/';

  constructor(private httpClient: HttpClient) { }

  public getInformacion(): Observable<Informacion[]> {
    return this.httpClient.get<Informacion[]>(this.informacionURL1+'lista');
  }

  public getInformacionPorTipo(tipo: number): Observable<Informacion[]> {
    return this.httpClient.get<Informacion[]>(this.informacionURL1 + `lista/${tipo}`);
  }

  public getInformacionPorId(id: number): Observable<Informacion> {
    return this.httpClient.get<Informacion>(this.informacionURL1 + `detalle/${id}`);
  }

  public crearInformacion(informacion: Informacion, id: number): Observable<any> {
    console.log(informacion);
    return this.httpClient.post<any>(this.informacionURL1 + `nuevo/${id}`, informacion);
  }

  public editarInformacion(informacion: Informacion, id: number): Observable<any> {
    return this.httpClient.put<any>(this.informacionURL1 + `actualizar/${id}`, informacion);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.informacionURL + `borrar/${id}`);
  } 
}
