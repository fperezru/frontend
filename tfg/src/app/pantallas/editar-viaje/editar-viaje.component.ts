import { Component, OnInit, Inject } from '@angular/core';
import { Viaje, Archivo, Usuario } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { ViajeService } from 'src/app/core/services/viaje/viaje.service';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { InterfazViajesService } from 'src/app/core/services/interfaz-viajes/interfaz-viajes.service';

@Component({
  selector: 'app-editar-viaje',
  templateUrl: './editar-viaje.component.html',
  styleUrls: ['./editar-viaje.component.scss']
})
export class EditarViajeComponent implements OnInit {

  viaje: Viaje;
  private lugarActual: string;
  private descripcionActual: string;
  private archvioSeleccionado: File;
  modo: number;
  imageObject: Array<object> = [];
  usuario: Usuario;
  archivos: Array<Archivo> = [];
  idUsuario: number;
  link: Array<string> = [];
  permiso: boolean = true;
  archivoSubido: Archivo;
  linkArchivo: string;
  editar: boolean = false;

  constructor(public dialogoRef: MatDialogRef<EditarViajeComponent>, @Inject(MAT_DIALOG_DATA) public data: string, public snackService: SnackService, private viajeService: ViajeService, private tokenService: TokenService, private uploadService: UploadService, private authService: AuthService, public interfazViajeService: InterfazViajesService) { }

  ngOnInit(): void {
    this.modo = 0;
    this.archivoSubido = new Archivo();
    this.viaje = new Viaje();
    if(this.data !== null) {
      this.viajeService.getViajesPorLugar(this.data).subscribe(data => {
        this.viaje = data;
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
    else 
      this.viaje = this.viaje;

    this.lugarActual = this.viaje.lugar;
    this.descripcionActual = this.viaje.descripcion;

    this.authService.getUser(this.tokenService.getUserName()).subscribe(data => {
      this.usuario = data;
      this.permiso = this.usuario.permiso;
    },
      (error: any) => {
        console.log(error)
      }
    );

    if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
      this.idUsuario = this.tokenService.getId();
    }
    else {
      this.idUsuario = this.tokenService.getIdUsuario();
    }

    this.slider();

  }

  public validaciones(viaje: Viaje) {

    let save: boolean = true;

    /*if (viaje.lugar === undefined || viaje.lugar.length === 0 || !/^[a-zA-Z0-9\u00C0-\u00FF]*$/.test(viaje.lugar)) {
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

  public onFileChanged(event) {
    this.archvioSeleccionado = event.target.files[0];
  }

  public onUpload(idUsuario: number, idRecuerdo: number, editar: boolean) {
    //this.mascota.imagen1 = this.archvioSeleccionado.name;
    console.log(this.archvioSeleccionado);

    const uploadImageData = new FormData();
    uploadImageData.append('file', this.archvioSeleccionado, this.archvioSeleccionado.name)

    this.uploadService.uploadFile(uploadImageData, "viaje", idUsuario, idRecuerdo ).subscribe(data => {
      console.log("subida archivo ok");
      this.archivoSubido = data;
      this.linkArchivo = this.archivoSubido.link;
      console.log(this.linkArchivo);
      if(editar === true) {
        this.imageObject.push({
          image: this.linkArchivo,
          thumbImage: this.linkArchivo,
        });
      }
    },
      (error: any) => {
        console.log(error)
      }
    );

  }

  public editarViaje(viaje: Viaje) {
    this.viaje.lugar = viaje.lugar;
    this.viaje.descripcion= viaje.descripcion;

    let save = this.validaciones(viaje);

    if (save) {
      this.viajeService.editarViaje(viaje, viaje.id).subscribe(data => {
        console.log("actualizado viaje ok");
        this.editar = true;
        if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
          this.onUpload(this.tokenService.getId(), viaje.id, this.editar);
        }
        else {
          this.onUpload(this.tokenService.getIdUsuario(), viaje.id, this.editar);
        }
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
    this.modo = 0;
    this.editar = false;
  }

  public noEditar() {
    this.viaje.lugar = this.lugarActual;
    this.viaje.descripcion = this.descripcionActual;
    this.modo = 0;
  }

  public eliminarViaje(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.interfazViajeService.deleteRecuerdo(id);
      this.viajeService.borrar(id).subscribe(data => {
        this.dialogoRef.close();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

  public slider() {
    this.uploadService.getViajes(this.idUsuario).subscribe(data => {
      this.archivos = data;
      console.log(this.archivos.length);
      for(let i = 0; i < this.archivos.length; i ++) {
        if(this.viaje.id === this.archivos[i].idRecuerdo) {
          this.imageObject.push({
            image: this.archivos[i].link,
            thumbImage: this.archivos[i].link,
          });
        }
      }
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

}