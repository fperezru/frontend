import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaURL = 'http://localhost:8080/api/personas/';
  personaURL1 = 'http://192.168.0.21:8080/api/personas/';

  constructor(private httpClient: HttpClient) { }

  public getPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.personaURL1+'lista');
  }

  public getPersonaPorId(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(this.personaURL1 + `detalle/${id}`);
  }

  public getPersonasPorUser(id: Number): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.personaURL1 + `lista/${id}`);
  }

  public crearPersona(persona: Persona, id: Number): Observable<any> {
    return this.httpClient.post<any>(this.personaURL1 + `nuevo/${id}`, persona);
  }

  public editarPersona(persona: Persona, id: number): Observable<any> {
    return this.httpClient.put<any>(this.personaURL1 + `actualizar/${id}`, persona);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.personaURL1 + `borrar/${id}`);
  } 
}
