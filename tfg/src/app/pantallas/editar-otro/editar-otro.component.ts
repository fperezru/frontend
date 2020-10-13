import { Component, OnInit, Inject } from '@angular/core';
import { OtrosRecuerdos, Usuario, Archivo } from 'src/app/core/clases/clases';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { OtroService } from 'src/app/core/services/otro/otro.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';
import { InterfazOtrosService } from 'src/app/core/services/interfaz-otros/interfaz-otros.service';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';

@Component({
  selector: 'app-editar-otro',
  templateUrl: './editar-otro.component.html',
  styleUrls: ['./editar-otro.component.scss']
})
export class EditarOtroComponent implements OnInit {

  otro: OtrosRecuerdos;
  usuario: Usuario;
  private tipoActual: string;
  private descripcionActual: string;
  private archvioSeleccionado: File;
  modo: number;
  imageObject: Array<object> = [];
  archivos: Array<Archivo> = [];
  idUsuario: number;
  link: Array<string> = [];
  permiso: boolean = true;
  archivoSubido: Archivo;
  linkArchivo: string;
  editar: boolean = false;
  constructor(public dialogoRef: MatDialogRef<EditarOtroComponent>, @Inject(MAT_DIALOG_DATA) public data: OtrosRecuerdos, public snackService: SnackService, private otroService: OtroService, private uploadService: UploadService, private interfaceOtros: InterfazOtrosService, private tokenService: TokenService, private authService: AuthService) { }

  ngOnInit(): void {
    this.modo = 0;
    this.archivoSubido = new Archivo();
    if(this.data !== null) {
      this.otro = this.data;
    }
    else 
      this.otro= this.otro;
    

    this.tipoActual = this.otro.tipo;
    this.descripcionActual = this.otro.descripcion;

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

  public validaciones(recuerdo: OtrosRecuerdos) {

    let save: boolean = true;

    /*if (recuerdo.tipo === undefined || recuerdo.tipo.trim().length === 0 || !/[a-zA-Z\u00C0-\u017F\s]+/.test(recuerdo.tipo)) {
      this.snackService.errorSnackbar('El tipo de recuerdo no debe estar vacío ni contener números');
      save = false;
    }
    else if (recuerdo.descripcion === undefined || recuerdo.descripcion === null || !/[a-zA-Z\u00C0-\u017F\s]+/.test(recuerdo.descripcion)) {
      this.snackService.errorSnackbar('La descripción del recuerdo no debe estar vacía');
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

    this.uploadService.uploadFile(uploadImageData, "otro", idUsuario, idRecuerdo ).subscribe(data => {
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

  public editarRecuerdo(recuerdo: OtrosRecuerdos) {
    this.otro.tipo = recuerdo.tipo;
    this.otro.descripcion = recuerdo.descripcion;

    let save = this.validaciones(recuerdo);

    if (save) {
      this.otroService.editarRecuerdo(recuerdo, recuerdo.id).subscribe(data => {
        console.log("actualizado recuerdo ok");
        this.editar = true;
        if (this.tokenService.getIdUsuario() === null || this.tokenService.getIdUsuario() === undefined || this.tokenService.getIdUsuario() === 0) {
          this.onUpload(this.tokenService.getId(), recuerdo.id, this.editar);
        }
        else {
          this.onUpload(this.tokenService.getIdUsuario(), recuerdo.id, this.editar);
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
    this.otro.tipo = this.tipoActual;
    this.otro.descripcion = this.descripcionActual;
    this.modo = 0;
  }

  public eliminarRecuerdo(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.otroService.borrar(id).subscribe(data => {
        this.interfaceOtros.deleteRecuerdo(id);
        this.dialogoRef.close();
        this.interfaceOtros.back();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

  public slider() {
    this.uploadService.getOtros(this.idUsuario).subscribe(data => {
      this.archivos = data;
      console.log(this.archivos.length);
      for(let i = 0; i < this.archivos.length; i ++) {
        if(this.otro.id === this.archivos[i].idRecuerdo) {
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
