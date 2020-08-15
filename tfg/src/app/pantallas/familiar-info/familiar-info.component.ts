import { Component, OnInit } from '@angular/core';
import { InformacionesService } from 'src/app/core/services/informaciones/informaciones.service';

@Component({
  selector: 'app-familiar-info',
  templateUrl: './familiar-info.component.html',
  styleUrls: ['./familiar-info.component.scss']
})
export class FamiliarInfoComponent implements OnInit {

  constructor(public informacionesService: InformacionesService) { }

  ngOnInit(): void {
  }

  public setTipoInformacion(tipoInfo: number) {
    this.informacionesService.setTipoInformacion(tipoInfo);
  }

}
