import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NuevoUsuario, Usuario } from 'src/app/core/clases/clases';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { AnimacionService } from 'src/app/core/services/animacionService/animacion-service.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ok } from 'assert';

@Component({
  selector: 'app-registro-familiar',
  templateUrl: './registro-familiar.component.html',
  styleUrls: ['./registro-familiar.component.scss']
})
export class RegistroFamiliarComponent implements OnInit {

  form: any = {};
  private usuario: any = {};
  isRegister = false;
  isRegisterFail = false;
  errorMsg = '';
  hide: boolean;
  disabled: boolean;
  loading: boolean;
  usuarios: Usuario[] = [];
  ok: boolean = true;
  roles: string[] = ['familiar']

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private authService: AuthService, private animacionService: AnimacionService, private router: Router, private snackService: SnackService, public userService: UserService) { }

  ngOnInit(): void {
    this.animacionService.createScene(this.rendererCanvas);
    this.animacionService.animate();
    this.hide = true;
    this.disabled = false;
  }

  public validaciones(): boolean {
    
    this.userService.getUsuarios().subscribe(data => {
      for(let i = 0; i < data.length; i ++) {
        if(this.form.nombreUsuario == data[i].nombreUsuario) {
          this.ok = false;
          this.snackService.errorSnackbar('El nombre de usuario ya se encuentra en uso');
        }
      }
    },
      (error: any) => {
        console.log(error)
      }
    );

    return this.ok;
  }

  onRegister() {
    if (this.validaciones() == true) {
      this.usuario = new NuevoUsuario(this.form.nombre, this.form.nombreUsuario, this.form.email, this.form.password, this.roles, null );
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
  }





}
