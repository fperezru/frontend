import { Component, OnInit, Inject } from '@angular/core';
import { Viaje } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { ViajeService } from 'src/app/core/services/viaje/viaje.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.component.html',
  styleUrls: ['./nuevo-viaje.component.scss']
})
export class NuevoViajeComponent implements OnInit {

  viaje: Viaje;
  idUser: Number;

  constructor(public dialogoRef: MatDialogRef<NuevoViajeComponent>, @Inject(MAT_DIALOG_DATA) public data:Number, public snackService: SnackService, private viajeService: ViajeService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.viaje = new Viaje();
    if(this.data !== null){
      this.idUser = this.data;
      console.log(this.idUser);
    }
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

  public addViaje(viaje: Viaje) {

    this.idUser = this.tokenService.getId();

    let save = this.validaciones(viaje);
    if (save) {
      this.viajeService.crearViaje(viaje, this.idUser).subscribe(data => {
        console.log("guardado viaje ok");
      },
        (error: any) => {
          console.log(error)
        }
      );
      this.dialogoRef.close();
    }
  }



}
