import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  serverURL = 'http://localhost:8080/api/upload/';

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: FormData): Observable<any> {
    return this.httpClient.post<any>(this.serverURL + `file`, file);
  }
}
