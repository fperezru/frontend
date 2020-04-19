import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NuevoUsuario } from 'src/app/core/clases/clases';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { AnimacionService } from 'src/app/core/services/animacionService/animacion-service.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
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

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private authService: AuthService, private animacionService: AnimacionService, private router: Router, private snackService: SnackService) { }

  ngOnInit() {
    this.animacionService.createScene(this.rendererCanvas);
    this.animacionService.animate();
    this.hide = true;
    this.disabled = false;
  }

  onRegister() {
    this.usuario = new NuevoUsuario(this.form.nombre, this.form.nombreUsuario, this.form.email, this.form.password);
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
