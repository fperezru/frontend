import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from 'src/app/core/clases/clases';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onRegister() {
    this.usuario = new NuevoUsuario(this.form.nombre, this.form.nombreUsuario, this.form.email, this.form.password);
    this.authService.registro(this.usuario).subscribe(data => {
      this.isRegister = true;
      this.isRegisterFail = false;
    },
      (error: any) => {
        console.log(error.error.mensaje);
        this.errorMsg = error.error.mensaje;
        this.isRegister = false;
        this.isRegisterFail = true;
      }
    );
  }

}
