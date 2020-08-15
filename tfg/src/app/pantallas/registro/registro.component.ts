import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NuevoUsuario, Rol, Usuario } from 'src/app/core/clases/clases';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { AnimacionService } from 'src/app/core/services/animacionService/animacion-service.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { usuarios } from '../login/login.component';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form: any = {};
  private usuario: any = {};
  isRegister = false;
  isRegisterFail = false;
  errorMsg = '';
  hide: boolean;
  disabled: boolean;
  loading: boolean;
  roles: string[] = ['user']
  rol: Rol;
  save: Boolean = true;
  familiar: number;
  usuarios: Usuario[] = [];

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private authService: AuthService, private animacionService: AnimacionService, private router: Router, private snackService: SnackService, private userService: UserService) { }

  ngOnInit() {
    this.animacionService.createScene(this.rendererCanvas);
    this.animacionService.animate();
    this.hide = true;
    this.disabled = false;
    this.rol = new Rol();
    this.rol.id = 3;
    this.rol.rolNombre = "ROLE_FAMILIAR";

    this.userService.getFamiliares(3).subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios);
    },
      (error: any) => {
        console.log(error)
      }
    );
    console.log(this.usuarios);
  }

  public validaciones() {
    let save: boolean = true;

    for(let i = 0; i < this.usuarios.length; i ++) {
      if(this.form.familiar === this.usuarios[i].nombreUsuario) {
          save = true;
          this.familiar = this.usuarios[i].id;
          console.log(this.form.familiar === this.usuarios[i].nombreUsuario);
          this.save = false;
      }
      else if (this.save === true) {
        save = false;
      }
    }
      
    console.log(save);
    return save;
  }

  onRegister() {
    let save = this.validaciones();
    console.log(save);
    console.log(this.familiar);
    if (save) {
      this.usuario = new NuevoUsuario(this.form.nombre, this.form.nombreUsuario, this.form.apellidos, this.form.identificacion, this.form.fechaNacimiento, this.form.domicilio, this.form.telefono, this.form.email, this.form.password, this.roles, this.familiar, true);
      this.authService.registro(this.usuario).subscribe(data => {
        this.isRegister = true;
        this.isRegisterFail = false;
        this.loading = true;
        this.disabled = true;
      },
        (error: any) => {
          console.log(error.error.mensaje);
          this.errorMsg = error.error.mensaje;
          this.isRegister = false;
          this.isRegisterFail = true;
          this.loading = false;
          this.snackService.errorSnackbar('Registro no completado');
        },
        () => {
          if(this.isRegister = true) {
            this.router.navigate(['login']);
            this.snackService.successSnackbar('Registo de usuario realizado correctamente');
          } else {
            console.log("Error al registrar usuario");
          }
        }
      );
    }
    else 
      this.snackService.errorSnackbar('No hay ningun familiar registrado en la aplicacion con ese nombre de usuario');
  }

}
