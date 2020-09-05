import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NuevoUsuario, Rol, Usuario } from 'src/app/core/clases/clases';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { AnimacionRegistroService } from 'src/app/core/services/animacionRegistro/animacion-registro.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { usuarios } from '../login/login.component';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import {Location} from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

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
  
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private authService: AuthService, private animacionService: AnimacionRegistroService, private router: Router, private snackService: SnackService, private userService: UserService, private tokenService: TokenService, private location: Location) { }

  ngOnInit(): void {
    
    this.roles = this.tokenService.getAuthorities();
    this.fam = new Usuario();
    this.authService.getUser(this.tokenService.getUserName()).subscribe(data => {
      this.usuario = data;
      this.fecha = new Date(this.usuario.fechaNacimiento);
      console.log(this.usuario.fechaNacimiento);

      this.authService.getUserById(this.usuario.familiar).subscribe(data => {
        this.familiar = data;
        this.familiarUser = this.familiar.nombreUsuario;

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
      },
        (error: any) => {
          console.log(error)
        }
      );
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
      this.snackService.errorSnackbar('El teléfono del usuario no debe estar vacío');
      save = false;
    }

    return save;
  }

  modificarPerfil(usuario: Usuario, password: string, fecha: Date, familiarUser: string) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.nombreUsuario = usuario.nombreUsuario;
    this.usuario.password = password;
    this.usuario.apellidos = usuario.apellidos;
    this.usuario.identificacion = usuario.identificacion;
    this.usuario.telefono = usuario.telefono;
    this.usuario.email = usuario.email;
    this.usuario.domicilio = usuario.domicilio;
    this.usuario.fechaNacimiento = fecha;

    console.log(familiarUser);
    this.authService.getUser(familiarUser).subscribe(data => {
      this.fam = data;
      this.usuario.familiar = this.fam.id;
      console.log(data[0]);
    },
      (error: any) => {
        console.log(error)
      }
    );

    let save = this.validaciones(this.usuario);

    if(save) {
      this.userService.editarUsuario(usuario, usuario.id).subscribe(data => {
        console.log("actualizado usuario ok");
        this.location.back();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
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
    this.location.back();
  }

}
