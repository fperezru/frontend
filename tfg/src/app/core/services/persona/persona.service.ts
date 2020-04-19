import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaURL = 'http://localhost:8080/api/personas/';

  constructor(private httpClient: HttpClient) { }

  public getPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.personaURL+'lista');
  }

  public getPersonaPorId(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(this.personaURL + `detalle/${id}`);
  }

  public getPersonasPorUser(id: Number): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.personaURL + `lista/${id}`);
  }

  public crearPersona(persona: Persona): Observable<any> {
    return this.httpClient.post<any>(this.personaURL + 'nuevo', persona);
  }

  public editarPersona(persona: Persona, id: number): Observable<any> {
    return this.httpClient.put<any>(this.personaURL + `actualizar/${id}`, persona);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.personaURL + `borrar/${id}`);
  } 
}
