import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  mascotaURL = 'http://localhost:8080/api/mascotas/';

  constructor(private httpClient: HttpClient) { }

  public getMascotas(): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(this.mascotaURL+'lista');
  }

  public getMascotaPorId(id: number): Observable<Mascota> {
    return this.httpClient.get<Mascota>(this.mascotaURL + `detalle/${id}`);
  }

  public getMascotasPorUser(id: Number): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(this.mascotaURL + `lista/${id}`);
  }

  public crearMascota(persona: Mascota, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.mascotaURL + `nuevo/${id}`, persona);
  }

  public editarMascota(persona: Mascota, id: number): Observable<any> {
    return this.httpClient.put<any>(this.mascotaURL + `actualizar/${id}`, persona);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.mascotaURL + `borrar/${id}`);
  } 
}
