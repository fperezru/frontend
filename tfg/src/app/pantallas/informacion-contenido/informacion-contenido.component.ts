import { Component, OnInit } from '@angular/core';
import { InformacionesService } from 'src/app/core/services/informaciones/informaciones.service';

@Component({
  selector: 'app-informacion-contenido',
  templateUrl: './informacion-contenido.component.html',
  styleUrls: ['./informacion-contenido.component.scss']
})
export class InformacionContenidoComponent implements OnInit {

  contenido: string;
  constructor(public informacionesService: InformacionesService) { }

  ngOnInit(): void {
    this.contenido = sessionStorage.getItem('CONTENIDO');
  }

}
