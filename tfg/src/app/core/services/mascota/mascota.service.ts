import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  mascotaURL = 'http://localhost:8080/api/mascotas/';
  mascotaURL1 = 'http://192.168.0.21:8080/api/mascotas/';

  constructor(private httpClient: HttpClient) { }

  public getMascotas(): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(this.mascotaURL1+'lista');
  }

  public getMascotaPorId(id: number): Observable<Mascota> {
    return this.httpClient.get<Mascota>(this.mascotaURL1 + `detalle/${id}`);
  }

  public getMascotasPorUser(id: Number): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(this.mascotaURL1 + `lista/${id}`);
  }

  public crearMascota(mascota: Mascota, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.mascotaURL1+ `nuevo/${id}`, mascota);
  }

  public editarMascota(mascota: Mascota, id: number): Observable<any> {
    return this.httpClient.put<any>(this.mascotaURL1 + `actualizar/${id}`, mascota);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.mascotaURL1 + `borrar/${id}`);
  } 
}
