import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiarioService } from 'src/app/core/services/diarioService/diario.service';
import { Diario } from 'src/app/core/clases/clases';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-pagina',
  templateUrl: './editar-pagina.component.html',
  styleUrls: ['./editar-pagina.component.scss']
})

export class EditarPaginaComponent implements OnInit {
  public diario: Diario;
  private currentTitulo: string;
  private currentDiario: string;
  fechaAux: string;
  editAux: boolean;

  constructor(public dialogoRef: MatDialogRef<EditarPaginaComponent>, private diarioService: DiarioService, @Inject(MAT_DIALOG_DATA) public data: Diario, private tokenService: TokenService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.editAux = noEdit;
    console.log(this.editAux);
    if(this.data !== null) {
      this.diario = this.data;
      this.fechaAux = this.datepipe.transform(this.diario.fecha, 'dd/MM/yyyy', 'es-ES');
    }
    else  
      this.diario = this.diario;
    this.currentDiario = this.diario.diario;
    this.currentTitulo = this.diario.titulo;
    var fecha = new Date(this.diario.fecha);
    fecha.setHours(0, 0, 0, 0);
    var fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    if (fecha < fechaHoy) {
      noEdit = true;
      console.log(fecha + "|" +fechaHoy);
    }
    else if (fecha >= fechaHoy)
      noEdit = false;
  }

  public editarPagina(diario: Diario) {
    this.diario.titulo = diario.titulo;
    this.diario.diario = diario.diario;

    this.diarioService.editarPagina(this.diario, this.diario.id).subscribe(
      pagina => {
        this.diario = pagina;
        this.dialogoRef.close();
      },
      error => {
        this.noEditar();
        console.log(error);
      }
    );
  }

  public noEditar() {
    this.diario.titulo = this.currentTitulo;
    this.diario.diario = this.currentDiario;
    this.dialogoRef.close();
  }

}

export var noEdit = false;
