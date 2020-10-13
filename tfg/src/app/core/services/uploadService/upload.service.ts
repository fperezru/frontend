import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Archivo } from '../../clases/clases';

const cabecera = {headers: new HttpHeaders({'Content-Type': ''})};

@Injectable({
  providedIn: 'root'
})

export class UploadService {


  serverURL = 'http://localhost:8080/api/upload/';
  serverURL1 = 'http://192.168.0.21/api/upload/';
  archivoURL = 'http://localhost:8080/api/archivos/';
  archivoURL1 = 'http://192.168.0.21:8080/api/archivos/';

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: FormData, tipo: string, idUsuario: number, idRecuerdo: number): Observable<any> {
    return this.httpClient.post<any>(this.serverURL + `uploadFile/${tipo}/${idUsuario}/${idRecuerdo}`, file);
  }

  public uploadMultipleFiles(file: FormData, tipo: string, idUsuario: number, idRecuerdo: number): Observable<any> {
    return this.httpClient.post<any>(this.serverURL + `uploadMultipleFiles/${tipo}/${idUsuario}/${idRecuerdo}`, file);
  }

  public getMascotas(id: Number): Observable<Archivo[]> {
    return this.httpClient.get<Archivo[]>(this.archivoURL + `listaMascotas/${id}`);
  }

  public getPersonas(id: Number): Observable<Archivo[]> {
    return this.httpClient.get<Archivo[]>(this.archivoURL + `listaPersonas/${id}`);
  }

  public getViajes(id: Number): Observable<Archivo[]> {
    return this.httpClient.get<Archivo[]>(this.archivoURL + `listaViajes/${id}`);
  }

  public getOtros(id: Number): Observable<Archivo[]> {
    return this.httpClient.get<Archivo[]>(this.archivoURL + `listaOtros/${id}`);
  }

  public download(link: string): Observable<any> {
    return this.httpClient.get<any>(link, { responseType: 'blob' as 'json' });
  }
}
