import { Component, OnInit, Inject } from '@angular/core';
import { Viaje } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { ViajeService } from 'src/app/core/services/viaje/viaje.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-editar-viaje',
  templateUrl: './editar-viaje.component.html',
  styleUrls: ['./editar-viaje.component.scss']
})
export class EditarViajeComponent implements OnInit {

  viaje: Viaje;
  private lugarActual: string;
  private descripcionActual: string;

  constructor(public dialogoRef: MatDialogRef<EditarViajeComponent>, @Inject(MAT_DIALOG_DATA) public data: Viaje, public snackService: SnackService, private viajeService: ViajeService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.viaje = this.data;
    }
    else 
      this.viaje = this.viaje;

    this.lugarActual = this.viaje.lugar;
    this.descripcionActual = this.viaje.descripcion;

  }

  public validaciones(viaje: Viaje) {

    let save: boolean = true;

    if (viaje.lugar === undefined || viaje.lugar.length === 0 || !/^[a-zA-Z0-9\u00C0-\u00FF]*$/.test(viaje.lugar)) {
      this.snackService.errorSnackbar('El lugar del viaje no debe estar vacío');
      save = false;
    }
    else if (viaje.descripcion === undefined || viaje.descripcion.trim().length === 0 || !/^[a-zA-Z0-9\u00C0-\u00FF]*$/.test(viaje.descripcion)) {
      this.snackService.errorSnackbar('La descripción del viaje no debe estar vacía');
      save = false;
    }

    console.log(save);
    return save;
  }

  public editarViaje(viaje: Viaje) {
    this.viaje.lugar = viaje.lugar;
    this.viaje.descripcion= viaje.descripcion;

    let save = this.validaciones(viaje);

    if (save) {
      this.viajeService.editarViaje(viaje, viaje.id).subscribe(data => {
        console.log("actualizado viaje ok");
      },
        (error: any) => {
          console.log(error)
        }
      );
      this.dialogoRef.close();
    }
  }

  public noEditar() {
    this.viaje.lugar = this.lugarActual;
    this.viaje.descripcion = this.descripcionActual;
    this.dialogoRef.close();
  }

}
