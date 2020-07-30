import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../../clases/clases';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  tipoURL = 'http://localhost:8080/api/tipo/';

  constructor(private httpClient: HttpClient) { }

  public getInformacion(): Observable<Tipo[]> {
    return this.httpClient.get<Tipo[]>(this.tipoURL+'lista');
  }
}
