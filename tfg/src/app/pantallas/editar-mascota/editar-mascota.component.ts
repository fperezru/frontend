import { Component, OnInit, Inject } from '@angular/core';
import { Mascota } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.scss']
})
export class EditarMascotaComponent implements OnInit {
  mascota: Mascota;
  private nombreActual: string;
  private especieActual: string;
  private descripcionActual: string;

  constructor(public dialogoRef: MatDialogRef<EditarMascotaComponent>, @Inject(MAT_DIALOG_DATA) public data:Mascota, public snackService: SnackService, private mascotaService: MascotaService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.mascota = this.data;
    }
    else 
      this.mascota = this.mascota;

    this.nombreActual = this.mascota.nombre;
    this.especieActual = this.mascota.especie;
    this.descripcionActual = this.mascota.descripcion;

  }

  public validaciones(mascota: Mascota) {

    let save: boolean = true;

    if (mascota.nombre === undefined || mascota.nombre.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(mascota.nombre)) {
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
    }

    console.log(save);
    return save;
  }

  public editarMascota(mascota: Mascota) {
    this.mascota.nombre = mascota.nombre;
    this.mascota.descripcion= mascota.descripcion;
    this.mascota.especie = mascota.especie;

    let save = this.validaciones(mascota);
    if (save) {
      this.mascotaService.editarMascota(mascota, mascota.id).subscribe(data => {
        console.log("actualizado mascota ok");
      },
        (error: any) => {
          console.log(error)
        }
      );
      this.dialogoRef.close();
    }
  }

  public noEditar() {
    this.mascota.nombre = this.nombreActual;
    this.mascota.descripcion= this.descripcionActual;
    this.mascota.especie = this.especieActual;
    this.dialogoRef.close();
  }


}
