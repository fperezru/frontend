import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.scss']
})
export class ActualizarCuentaComponent implements OnInit {

  usuario: Usuario;
  password: string;
  hide: boolean;
  private nombreActual: string;
  private nombreUsuarioActual: string;
  private emailActual: string;
  private passwordActual: string;

  constructor(public dialogoRef: MatDialogRef<ActualizarCuentaComponent>, @Inject(MAT_DIALOG_DATA) public data: Usuario, public snackService: SnackService, private tokenService: TokenService, private userService: UserService) { }
  
  ngOnInit(): void {
    if(this.data !== null) {
      this.usuario = this.data;
    }
    else 
      this.usuario = this.usuario;
    
    this.nombreActual = this.usuario.nombre;
    this.nombreUsuarioActual = this.usuario.nombreUsuario;
    this.emailActual = this.usuario.email;
    this.passwordActual = this.usuario.password;

    this.hide = true;
  }

  public validaciones(usuario: Usuario) {

    let save: boolean = true;

    if (usuario.nombre=== undefined || usuario.nombre.trim().length === 0 ) {
      this.snackService.errorSnackbar('El nombre del usuario no debe estar vacío');
      save = false;
    }
    else if (usuario.nombreUsuario === undefined || usuario.nombreUsuario.trim().length === 0 ) {
      this.snackService.errorSnackbar('El user del usuario no debe estar vacío');
      save = false;
    }
    else if (usuario.email === undefined || usuario.email.trim().length === 0 ) {
      this.snackService.errorSnackbar('El email del usuario no debe estar vacío');
      save = false;
    }
    else if (this.password === undefined || this.password.trim().length === 0 ) {
      this.snackService.errorSnackbar('La contraseña del usuario no debe estar vacía');
      save = false;
    }

    return save;
  }

  public editarCuenta(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.nombreUsuario = usuario.nombreUsuario;
    this.usuario.email = usuario.email;
    this.usuario.password = this.password;

    let save = this.validaciones(usuario);

    if(save) {
      this.userService.editarUsuario(usuario, usuario.id).subscribe(data => {
        console.log("actualizado usuario ok");
        this.dialogoRef.close();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

  public noEditar() {
    this.usuario.nombre = this.nombreActual;
    this.usuario.nombreUsuario = this.nombreUsuarioActual;
    this.usuario.email = this.emailActual;
    this.usuario.password = this.passwordActual

    this.dialogoRef.close();
  }

}
