import { Component, OnInit, Inject } from '@angular/core';
import { Mascota, Usuario, Archivo } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterfazService } from 'src/app/core/services/interfaz.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';

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
  

  constructor(public dialogoRef: MatDialogRef<EditarMascotaComponent>, @Inject(MAT_DIALOG_DATA) public data:Mascota, public snackService: SnackService, private mascotaService: MascotaService, private uploadService: UploadService, private interfaceService: InterfazService, private tokenService: TokenService, private authService: AuthService) { }

  ngOnInit(): void {
    this.modo = 0;
    this.archivoSubido = new Archivo();
    if(this.data !== null) {
      this.mascota = this.data;
      console.log(this.mascota);
    }

    this.nombreActual = this.mascota.nombre;
    this.especieActual = this.mascota.especie;
    this.descripcionActual = this.mascota.descripcion;

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

  public onFileChanged(event) {
    this.archvioSeleccionado = event.target.files[0];
  }

  public onUpload(idUsuario: number, idRecuerdo: number, editar: boolean) {
    //this.mascota.imagen1 = this.archvioSeleccionado.name;
    console.log(this.archvioSeleccionado);

    const uploadImageData = new FormData();
    uploadImageData.append('file', this.archvioSeleccionado, this.archvioSeleccionado.name)

    this.uploadService.uploadFile(uploadImageData, "mascota", idUsuario, idRecuerdo ).subscribe(data => {
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
  public editarMascota(mascota: Mascota) {
    this.mascota.nombre = mascota.nombre;
    this.mascota.descripcion= mascota.descripcion;
    this.mascota.especie = mascota.especie;

    let save = this.validaciones(mascota);
    if (save) {
      this.mascotaService.editarMascota(mascota, mascota.id).subscribe(data => {
        console.log("actualizado mascota ok");
        this.editar = true;
        if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
          this.onUpload(this.tokenService.getId(), mascota.id, this.editar);
        }
        else {
          this.onUpload(this.tokenService.getIdUsuario(), mascota.id, this.editar);
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
    this.mascota.nombre = this.nombreActual;
    this.mascota.descripcion= this.descripcionActual;
    this.mascota.especie = this.especieActual;
    this.modo = 0;
  }

  public eliminarMascota(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.mascotaService.borrar(id).subscribe(data => {
        this.interfaceService.deleteRecuerdo(id);
        this.dialogoRef.close();
        this.interfaceService.back();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

  public slider() {
    this.uploadService.getMascotas(this.idUsuario).subscribe(data => {
      this.archivos = data;
      console.log(this.archivos.length);
      for(let i = 0; i < this.archivos.length; i ++) {
        if(this.mascota.id === this.archivos[i].idRecuerdo) {
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
