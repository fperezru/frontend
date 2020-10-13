import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  viajeURL = 'http://localhost:8080/api/viajes/';
  viajeURL1 = 'http://192.168.0.21:8080/api/viajes/';

  constructor(private httpClient: HttpClient) { }

  public getViajes(): Observable<Viaje[]> {
    return this.httpClient.get<Viaje[]>(this.viajeURL1+'lista');
  }

  public getViajesPorId(id: number): Observable<Viaje> {
    return this.httpClient.get<Viaje>(this.viajeURL1 + `detalle/${id}`);
  }

  public getViajesPorLugar(lugar: string): Observable<Viaje> {
    return this.httpClient.get<Viaje>(this.viajeURL1 + `detalles/${lugar}`);
  }

  public getViajesPorUser(id: Number): Observable<Viaje[]> {
    return this.httpClient.get<Viaje[]>(this.viajeURL1 + `lista/${id}`);
  }

  public crearViaje(viaje: Viaje, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.viajeURL1+ `nuevo/${id}`, viaje);
  }

  public editarViaje(viaje: Viaje, id: number): Observable<any> {
    return this.httpClient.put<any>(this.viajeURL1 + `actualizar/${id}`, viaje);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.viajeURL1 + `borrar/${id}`);
  } 
}
