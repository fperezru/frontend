import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localizacion } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  localizacionURL = 'http://localhost:8080/api/localizacion/';
  localizacionURL1 = 'http://192.168.0.21:8080/api/localizacion/';

  constructor(private httpClient: HttpClient) { }

  public getLocalizaciones(): Observable<Localizacion[]> {
    return this.httpClient.get<Localizacion[]>(this.localizacionURL1+'lista');
  }

  public getLocalizacionPorId(id: number): Observable<Localizacion> {
    return this.httpClient.get<Localizacion>(this.localizacionURL1 + `detalle/${id}`);
  }

  public getLocalizacionPorUser(id: Number): Observable<Localizacion[]> {
    return this.httpClient.get<Localizacion[]>(this.localizacionURL1 + `lista/${id}`);
  }

  public crearLocalizacion(localizacion: Localizacion, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.localizacionURL1 + `nuevo/${id}`, localizacion);
  }

  public editarLocalizacion(localizacion: Localizacion, id: number): Observable<any> {
    return this.httpClient.put<any>(this.localizacionURL1 + `actualizar/${id}`, localizacion);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.localizacionURL1 + `borrar/${id}`);
  } 
}
