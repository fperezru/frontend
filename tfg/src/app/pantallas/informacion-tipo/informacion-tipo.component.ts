import { Component, OnInit } from '@angular/core';
import { Informacion, Tipo } from 'src/app/core/clases/clases';
import { InformacionesService } from 'src/app/core/services/informaciones/informaciones.service';
import { InformacionService } from 'src/app/core/services/informacion/informacion.service';

@Component({
  selector: 'app-informacion-tipo',
  templateUrl: './informacion-tipo.component.html',
  styleUrls: ['./informacion-tipo.component.scss']
})
export class InformacionTipoComponent implements OnInit {

  informacion: Informacion[] =[];
  tipo: Tipo;

  constructor(public informacionesService: InformacionesService, public informacionService: InformacionService) { }

  ngOnInit(): void {
    this.tipo = new Tipo();
    this.tipo.id = this.informacionesService.getTipoInformacion();
    this.informacionService.getInformacionPorTipo(Number(sessionStorage.getItem('TIPO'))).subscribe(data => {
      this.informacion = data;
      console.log(this.informacion);
    },
    error => console.log(error)
    );
  }

  public setContenidoInformacion(info: Informacion) {
    this.informacionesService.setContenidoInformacion(info.contenido);
  }

}
