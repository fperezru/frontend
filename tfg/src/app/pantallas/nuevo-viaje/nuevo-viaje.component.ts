import { Component, OnInit, Inject } from '@angular/core';
import { Viaje } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { ViajeService } from 'src/app/core/services/viaje/viaje.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { InterfazViajesService } from 'src/app/core/services/interfaz-viajes/interfaz-viajes.service';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.component.html',
  styleUrls: ['./nuevo-viaje.component.scss']
})
export class NuevoViajeComponent implements OnInit {

  viaje: Viaje;
  viajeGuardado: Viaje;
  idUser: number;
  idFamiliar: number;
  pais: string;
  private archvioSeleccionado: File;

  constructor(public dialogoRef: MatDialogRef<NuevoViajeComponent>, @Inject(MAT_DIALOG_DATA) public data:string, public snackService: SnackService, private viajeService: ViajeService, private tokenService: TokenService, private interfazViajeService: InterfazViajesService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.viaje = new Viaje();
    this.viajeGuardado = new Viaje();
    if(this.data !== null){
      this.pais = this.data;
    }
  }

  public onFileChanged(event) {
    this.archvioSeleccionado = event.target.files[0];
  }

  public onUpload(idUsuario: number, idRecuerdo: number) {
    //this.mascota.imagen1 = this.archvioSeleccionado.name;
    console.log(this.archvioSeleccionado);

    const uploadImageData = new FormData();
    uploadImageData.append('file', this.archvioSeleccionado, this.archvioSeleccionado.name)

    this.uploadService.uploadFile(uploadImageData, "viaje", idUsuario, idRecuerdo ).subscribe(data => {
      console.log("subida archivo ok");
    },
      (error: any) => {
        console.log(error)
      }
    );

  }

  public validaciones(viaje: Viaje) {

    let save: boolean = true;

    /*if (this.pais === undefined || this.pais.length === 0 || !/^[a-zA-Z0-9\u00C0-\u00FF]*$/.test(viaje.lugar)) {
      this.snackService.errorSnackbar('El lugar del viaje no debe estar vacío');
      save = false;
    }
    else if (viaje.descripcion === undefined || viaje.descripcion.trim().length === 0 || !/^[a-zA-Z0-9\u00C0-\u00FF]*$/.test(viaje.descripcion)) {
      this.snackService.errorSnackbar('La descripción del viaje no debe estar vacía');
      save = false;
    }*/

    console.log(save);
    return save;
  }

  public addViaje(viaje: Viaje) {

    this.idUser = this.tokenService.getId();
    let idRecuerdo: number;

    let save = this.validaciones(viaje);
    if (save) {
      viaje.lugar = this.pais;
      if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
        this.viajeService.crearViaje(viaje, this.idUser).subscribe(data => {
          console.log("guardado viaje ok");
          this.viajeGuardado = data;
          idRecuerdo = this.viajeGuardado.id;
          console.log(data);
          this.onUpload(this.idUser, idRecuerdo);
          this.interfazViajeService.cambiarColor();
        },
          (error: any) => {
            console.log(error)
          }
        );
      }
      else {
        this.viajeService.crearViaje(viaje, this.tokenService.getIdUsuario()).subscribe(data => {
          console.log("guardado viaje ok");
          this.viajeGuardado = data;
          idRecuerdo = this.viajeGuardado.id;
          this.onUpload(this.tokenService.getIdUsuario(), idRecuerdo);
          this.interfazViajeService.cambiarColor();
        },
          (error: any) => {
            console.log(error)
          }
        );
      }
      this.dialogoRef.close();
    }
  }



}
