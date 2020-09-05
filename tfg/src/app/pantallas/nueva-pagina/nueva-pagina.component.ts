import { Component, OnInit, Output, Inject } from '@angular/core';
import { EventEmitter } from 'events';
import { Diario } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiarioService } from 'src/app/core/services/diarioService/diario.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nueva-pagina',
  templateUrl: './nueva-pagina.component.html',
  styleUrls: ['./nueva-pagina.component.scss']
})
export class NuevaPaginaComponent implements OnInit {
  diario: Diario;
  fecha: Date;
  fechaAux: string;
  id: number
  
  constructor(public dialogoRef: MatDialogRef<NuevaPaginaComponent>, private diarioService: DiarioService, private tokenService: TokenService, @Inject(MAT_DIALOG_DATA) public data: Date, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.diario = new Diario();
    this.fecha = this.data;
    this.fechaAux = this.datepipe.transform(this.fecha, 'dd/MM/yyyy', 'es-ES');
    this.diario.fecha = this.fecha;
    this.id = this.tokenService.getId();

    if (this.diario.diario === undefined)
      this.diario.diario = '';
  }

  public addPagina(diario: Diario) {
    if(this.tokenService.getIdUsuario === null || this.tokenService.getIdUsuario() === undefined && this.tokenService.getIdUsuario() === 0) {
      this.diarioService.crearPagina(diario, this.id).subscribe(
        pagina => {
          diario = pagina;
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.diarioService.crearPagina(diario, this.tokenService.getIdUsuario()).subscribe(
        pagina => {
          diario = pagina;
        },
        error => {
          console.log(error);
        }
      );
    }
    this.dialogoRef.close();
  }
}
