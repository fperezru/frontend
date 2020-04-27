import { Component, OnInit, Inject } from '@angular/core';
import { OtrosRecuerdos } from 'src/app/core/clases/clases';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { OtroService } from 'src/app/core/services/otro/otro.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-otro',
  templateUrl: './nuevo-otro.component.html',
  styleUrls: ['./nuevo-otro.component.scss']
})
export class NuevoOtroComponent implements OnInit {

  otro: OtrosRecuerdos;
  idUser: Number;

  constructor(public dialogoRef: MatDialogRef<NuevoOtroComponent>, @Inject(MAT_DIALOG_DATA) public data:Number, public snackService: SnackService, private otroService: OtroService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.otro = new OtrosRecuerdos();
    if(this.data !== null){
      this.idUser = this.data;
      console.log(this.idUser);
    }
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

  public addRecuerdo(recuerdo: OtrosRecuerdos) {

    this.idUser = this.tokenService.getId();

    let save = this.validaciones(recuerdo);
    if (save) {
      this.otroService.crearRecuerdo(recuerdo, this.idUser).subscribe(data => {
        console.log("guardado recuerdo ok");
      },
        (error: any) => {
          console.log(error)
        }
      );
      this.dialogoRef.close();
    }
  }

}
