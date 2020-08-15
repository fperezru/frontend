import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformacionesService {

  tipoInformacion: number;
  contenidoInformacion: string;

  constructor() { }

  public getTipoInformacion() {
    return this.tipoInformacion;
  }

  public setTipoInformacion(tipoInformacion: number) {
    this.tipoInformacion = tipoInformacion;
    window.sessionStorage.setItem('TIPO', JSON.stringify(this.tipoInformacion));
  }

  public getContenidoInformacion() {
    return this.contenidoInformacion;
  }

  public setContenidoInformacion(contenidoInformacion: string) {
    this.contenidoInformacion = contenidoInformacion;
    window.sessionStorage.setItem('CONTENIDO', this.contenidoInformacion);
  }
}
