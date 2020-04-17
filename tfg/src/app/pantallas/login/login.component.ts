import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginUsuario } from 'src/app/core/clases/clases';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { Router } from '@angular/router';
import { AnimacionService } from 'src/app/core/services/animacionService/animacion-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  usuario: LoginUsuario;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';
  hide: boolean;
  disabled: boolean;
  loading: boolean;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router, private animacionService: AnimacionService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.animacionService.createScene(this.rendererCanvas);
    this.animacionService.animate();
    this.hide = true;
    this.disabled = false;
  }

  onLogin(): void {
    this.usuario = new LoginUsuario(this.form.nombreUsuario, this.form.password);

    this.authService.login(this.usuario).subscribe(data => {
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);

      this.isLogged = true;
      this.isLoginFail = false;
      this.loading = true;
      this.disabled = true;
      this.roles = this.tokenService.getAuthorities();
    },
      (err: any) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.loading = false;
        this.errorMsg = err.error.message;
      },
      () => {
        if(this.isLogged = true) {
          this.router.navigate(['home']);
        } else {
          console.log("Error al iniciar sesión");
        }
      }
    );
  }

}
