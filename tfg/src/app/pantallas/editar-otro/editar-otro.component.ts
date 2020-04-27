import { Component, OnInit, Inject } from '@angular/core';
import { OtrosRecuerdos } from 'src/app/core/clases/clases';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { OtroService } from 'src/app/core/services/otro/otro.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-otro',
  templateUrl: './editar-otro.component.html',
  styleUrls: ['./editar-otro.component.scss']
})
export class EditarOtroComponent implements OnInit {

  otro: OtrosRecuerdos;
  private tipoActual: string;
  private descripcionActual: string;

  constructor(public dialogoRef: MatDialogRef<EditarOtroComponent>, @Inject(MAT_DIALOG_DATA) public data: OtrosRecuerdos, public snackService: SnackService, private otroService: OtroService, private tokenService: TokenService) { }

  ngOnInit(): void {

    if(this.data !== null) {
      this.otro = this.data;
    }
    else 
      this.otro= this.otro;

    this.tipoActual = this.otro.tipo;
    this.descripcionActual = this.otro.descripcion;
  }

  public validaciones(recuerdo: OtrosRecuerdos) {

    let save: boolean = true;

    if (recuerdo.tipo === undefined || recuerdo.tipo.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(recuerdo.tipo)) {
      this.snackService.errorSnackbar('El tipo de recuerdo no debe estar vacío ni contener números');
      save = false;
    }
    else if (recuerdo.descripcion === undefined || recuerdo.descripcion === null || !/^[a-zA-Z0-9\u00C0-\u00FF]*$/.test(recuerdo.descripcion)) {
      this.snackService.errorSnackbar('La descripción del recuerdo no debe estar vacía');
      save = false;
    }

    console.log(save);
    return save;
  }

  public editarRecuerdo(recuerdo: OtrosRecuerdos) {
    this.otro.tipo = recuerdo.tipo;
    this.otro.descripcion = recuerdo.descripcion;

    let save = this.validaciones(recuerdo);

    if (save) {
      this.otroService.editarRecuerdo(recuerdo, recuerdo.id).subscribe(data => {
        console.log("actualizado recuerdo ok");
      },
        (error: any) => {
          console.log(error)
        }
      );
      this.dialogoRef.close();
    }
  }

  public noEditar() {
    this.otro.tipo = this.tipoActual;
    this.otro.descripcion = this.descripcionActual;
    this.dialogoRef.close();
  }

}
