import { Component, OnInit, Inject } from '@angular/core';
import { Informacion, Tipo, Usuario } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { InformacionService } from 'src/app/core/services/informacion/informacion.service';
import { TipoService } from 'src/app/core/services/tipo/tipo.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-editar-informacion',
  templateUrl: './editar-informacion.component.html',
  styleUrls: ['./editar-informacion.component.scss']
})
export class EditarInformacionComponent implements OnInit {

  informacion: Informacion;
  tipoInformacion: Tipo[] = [];
  idAdmin: number;
  admin: string;
  nuevoAdmin: Usuario;
  private tituloActual: string;
  private contenidoActual: string;
  private tipoActual: Tipo;
  private usuarioActual: Usuario;
  constructor(public dialogoRef: MatDialogRef<EditarInformacionComponent>, @Inject(MAT_DIALOG_DATA) public data:Informacion, public snackService: SnackService, private informacionService: InformacionService, private tipoService: TipoService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.informacion = this.data;
      this.idAdmin = this.tokenService.getId();
      this.admin = this.tokenService.getUserName();
      this.nuevoAdmin = new Usuario();
      this.nuevoAdmin.id = this.idAdmin;
      this.nuevoAdmin.nombreUsuario = this.admin
    }

    this.tipoActual = this.informacion.tipo;
    this.tituloActual = this.informacion.titulo;
    this.contenidoActual = this.informacion.contenido;
    this.usuarioActual = this.informacion.usuario;

    this.tipoInformacion = [
      {id: 1 , tipoNombre: 'ALIMENTACION'},
      {id: 2 , tipoNombre: 'EJERCICIOS'},
      {id: 3 , tipoNombre: 'ENFERMEDAD'},
      {id: 4 , tipoNombre: 'ORGANIZACIONES'},
    ];
  }

  public validaciones(informacion: Informacion) {

    let save: boolean = true;

    if (informacion.titulo === undefined || informacion.titulo.trim().length === 0 ) {
      this.snackService.errorSnackbar('El título de la información no debe estar vacío');
      save = false;
    }
    else if (informacion.contenido === undefined || informacion.contenido.trim().length === 0 ) {
      this.snackService.errorSnackbar('El contenido de la información no debe estar vacío');
      save = false;
    }
    else if (informacion.tipo === undefined || informacion.tipo === null ) {
      this.snackService.errorSnackbar('El tipo de la información no debe estar vacío');
      save = false;
    }
    else if (informacion.usuario === undefined || informacion.usuario === null ) {
      this.snackService.errorSnackbar('El administrador que ha creado/actualizado la información no debe estar vacío');
      save = false;
    }

    console.log(save);
    return save;
  }

  public editarInformacion(informacion: Informacion) {
    this.informacion.titulo = informacion.titulo;
    this.informacion.contenido = informacion.contenido;
    this.informacion.tipo = informacion.tipo;
    this.informacion.usuario = this.nuevoAdmin;

    let save = this.validaciones(informacion);

    if (save) {
      this.informacionService.editarInformacion(informacion, informacion.id).subscribe(data => {
        console.log("actualizado informacion ok");
        this.dialogoRef.close();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

  public noEditar() {
    this.informacion.titulo = this.tituloActual;
    this.informacion.contenido = this.contenidoActual;
    this.informacion.usuario = this.usuarioActual;
    this.informacion.tipo = this.tipoActual;

    this.dialogoRef.close();
  }
}