import { Component, OnInit, ViewChild, ElementRef, Inject} from '@angular/core';
import { NuevoUsuario, Rol, Usuario } from 'src/app/core/clases/clases';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { AnimacionRegistroService } from 'src/app/core/services/animacionRegistro/animacion-registro.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.scss']
})
export class ActualizarCuentaComponent implements OnInit {

  usuario: Usuario;
  fam: Usuario;
  errorMsg = '';
  hide: boolean;
  disabled: boolean;
  save: Boolean = true;
  password: string;
  roles: string[];
  fecha: Date;
  familiar: Usuario;
  familiarUser: string;
  nombreActual: string;
  apellidosActual: string;
  nombreUsuarioActual: string;
  passwordActual: string;
  fechaAcual: Date;
  domicilioActual: string;
  telefonoActual: string;
  identificacionActual: string;
  familiarActual: number;
  emailActual: string;
  familiarId: number;

  constructor(public dialogoRef: MatDialogRef<ActualizarCuentaComponent>, @Inject(MAT_DIALOG_DATA) public data: Usuario, public snackService: SnackService, public tokenService: TokenService, private userService: UserService, public authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.fam = new Usuario();

    if(this.data !== null) {
      this.usuario = this.data;
    }
    else 
      this.usuario = this.usuario;
    
    this.fecha = new Date(this.usuario.fechaNacimiento);
    this.nombreActual = this.usuario.nombre;
    this.nombreUsuarioActual = this.nombreUsuarioActual;
    this.fechaAcual = this.usuario.fechaNacimiento;
    this.passwordActual = this.usuario.password;
    this.telefonoActual = this.usuario.telefono;
    this.domicilioActual = this.usuario.domicilio;
    this.familiarActual = this.usuario.familiar;
    this.apellidosActual = this.usuario.apellidos;
    this.identificacionActual = this.usuario.identificacion;
    this.emailActual = this.usuario.email;

    this.hide = true;
    this.familiar = new Usuario();

    this.authService.getUserById(this.familiarActual).subscribe(data => {
      this.familiar = data;
      this.familiarUser = this.familiar.nombreUsuario;
    },
      (error: any) => {
        console.log(error)
      }
    );


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
    else if (usuario.apellidos === undefined || usuario.apellidos.trim().length === 0 ) {
      this.snackService.errorSnackbar('Los apellidos del usuario no debe estar vacío');
      save = false;
    }
    else if (usuario.identificacion === undefined || usuario.identificacion.trim().length === 0 ) {
      this.snackService.errorSnackbar('La identificación del usuario no debe estar vacío');
      save = false;
    }
    else if (usuario.domicilio === undefined || usuario.domicilio.trim().length === 0 ) {
      this.snackService.errorSnackbar('El domicilio del usuario no debe estar vacío');
      save = false;
    }
    else if (usuario.telefono === undefined || usuario.telefono.trim().length === 0 ) {
      this.snackService.errorSnackbar('El teléfono del usuario no debe estar vacío');
      save = false;
    }
    else if (usuario.fechaNacimiento === undefined || usuario.fechaNacimiento === null ) {
      this.snackService.errorSnackbar('La fecha de nacimiento del usuario no debe estar vacía');
      save = false;
    }
    else if (usuario.familiar === undefined || usuario.familiar === 0 || usuario.familiar === null ) {
      this.snackService.errorSnackbar('El familiar asocioado al usuario no puede estar vacío');
      save = false;
    }

    return save;
  }

  modificarPerfil(usuario: Usuario, password: string, fecha: Date, familiar: string) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.nombreUsuario = usuario.nombreUsuario;
    this.usuario.password = password;
    this.usuario.apellidos = usuario.apellidos;
    this.usuario.identificacion = usuario.identificacion;
    this.usuario.telefono = usuario.telefono;
    this.usuario.email = usuario.email;
    this.usuario.domicilio = usuario.domicilio;
    this.usuario.fechaNacimiento = fecha;

    this.authService.getUser(familiar).subscribe(data => {
      this.fam = data;
      this.usuario.familiar = this.fam.id;

      let save = this.validaciones(this.usuario);

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
      
      },
        (error: any) => {
          console.log(error)
        }
      );
    //this.usuario.familiar = this.familiarId;
  }

  noEditar() {
    this.usuario.nombre = this.nombreActual;
    this.usuario.nombreUsuario = this.nombreUsuarioActual;
    this.usuario.password = this.passwordActual;
    this.usuario.apellidos = this.apellidosActual;
    this.usuario.identificacion = this.identificacionActual;
    this.usuario.telefono = this.telefonoActual;
    this.usuario.email = this.emailActual;
    this.usuario.domicilio = this.domicilioActual;
    this.usuario.fechaNacimiento = this.fechaAcual;
    this.usuario.familiar = this.familiarActual;
    this.dialogoRef.close();
  }

  eliminarCuenta(id:number) {
    if (confirm('¿Estás seguro?')) {
      this.userService.borrar(id).subscribe(data => {
        console.log("eliminado usuario ok");
        this.dialogoRef.close();
        this.tokenService.logOut();
        this.router.navigate(["login"]);
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

}