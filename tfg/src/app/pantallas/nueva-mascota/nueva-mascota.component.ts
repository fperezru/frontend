import { Component, OnInit, Inject } from '@angular/core';
import { Mascota } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';
import { InterfazService } from 'src/app/core/services/interfaz.service';

@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.component.html',
  styleUrls: ['./nueva-mascota.component.scss']
})
export class NuevaMascotaComponent implements OnInit {

  mascota: Mascota;
  mascotas: Mascota[] = [];
  idUser: number;
  idFamiliar: Number;
  mascotaGuardada: Mascota;
  private archvioSeleccionado: File;

  constructor(public dialogoRef: MatDialogRef<NuevaMascotaComponent>, @Inject(MAT_DIALOG_DATA) public data:number, public snackService: SnackService, private mascotaService: MascotaService, private tokenService: TokenService, private uploadService: UploadService, private interfazService: InterfazService) { }

  ngOnInit(): void {
    this.mascotaGuardada = new Mascota();
    this.interfazService.stop();
    this.mascota = new Mascota();
    if(this.data !== null){
      this.idUser = this.data;
      console.log(this.idUser);
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

    this.uploadService.uploadFile(uploadImageData, "mascota", idUsuario, idRecuerdo ).subscribe(data => {
      console.log("subida archivo ok");
    },
      (error: any) => {
        console.log(error)
      }
    );

  }

  public validaciones(mascota: Mascota) {

    let save: boolean = true;

    /*if (mascota.nombre === undefined || mascota.nombre.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(mascota.nombre)) {
      this.snackService.errorSnackbar('El nombre de la mascota no debe estar vacío ni contener números');
      save = false;
    }
    else if (mascota.especie === undefined || mascota.especie.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(mascota.especie)) {
      this.snackService.errorSnackbar('La especie de la mascota no debe estar vacío ni contener números');
      save = false;
    }
    else if (mascota.descripcion === undefined || mascota.descripcion === null || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(mascota.descripcion)) {
      this.snackService.errorSnackbar('La descripción de la mascota no debe estar vacío ni contener números');
      save = false;
    }*/

    console.log(save);
    return save;
  }

  public addMascota(mascota: Mascota) {

    this.idUser = this.tokenService.getId();
    let idRecuerdo: number;

    let save = this.validaciones(mascota);
    if (save) {
      if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
        this.mascotaService.crearMascota(mascota, this.idUser).subscribe(data => {
          console.log("guardado mascota ok");
          this.mascotaGuardada = data;
          idRecuerdo = this.mascotaGuardada.id;
          console.log(idRecuerdo);
          this.interfazService.addRecuerdo(this.mascotas[this.mascotas.length-1]);
          this.onUpload(this.idUser, idRecuerdo);
        },
          (error: any) => {
            console.log(error)
          }
        );
      }
      else {
        this.mascotaService.crearMascota(mascota, this.tokenService.getIdUsuario()).subscribe(data => {
          console.log("guardado mascota ok");
          this.mascotaGuardada = data;
          idRecuerdo = this.mascotaGuardada.id;
          console.log(idRecuerdo);
          this.interfazService.addRecuerdo(this.mascotas[this.mascotas.length-1]);
          this.onUpload(this.tokenService.getIdUsuario(), idRecuerdo)
        },
          (error: any) => {
            console.log(error)
          }
        );
      }
      this.dialogoRef.close();
    }
  }

  public close() {
    this.dialogoRef.close();
    this.interfazService.back();
  }

}
