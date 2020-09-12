import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  viajeURL = 'http://localhost:8080/api/viajes/';

  constructor(private httpClient: HttpClient) { }

  public getViajes(): Observable<Viaje[]> {
    return this.httpClient.get<Viaje[]>(this.viajeURL+'lista');
  }

  public getViajesPorId(id: number): Observable<Viaje> {
    return this.httpClient.get<Viaje>(this.viajeURL + `detalle/${id}`);
  }

  public getViajesPorLugar(lugar: string): Observable<Viaje> {
    return this.httpClient.get<Viaje>(this.viajeURL + `detalles/${lugar}`);
  }

  public getViajesPorUser(id: Number): Observable<Viaje[]> {
    return this.httpClient.get<Viaje[]>(this.viajeURL + `lista/${id}`);
  }

  public crearViaje(viaje: Viaje, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.viajeURL+ `nuevo/${id}`, viaje);
  }

  public editarViaje(viaje: Viaje, id: number): Observable<any> {
    return this.httpClient.put<any>(this.viajeURL + `actualizar/${id}`, viaje);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.viajeURL + `borrar/${id}`);
  } 
}
