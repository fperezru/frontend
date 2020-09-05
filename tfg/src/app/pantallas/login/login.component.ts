import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginUsuario, Usuario, Rol } from 'src/app/core/clases/clases';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { AnimacionService } from 'src/app/core/services/animacionService/animacion-service.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { UserService } from 'src/app/core/services/user/user.service';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  rol: Rol;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router, private animacionService: AnimacionService, private snackService: SnackService, public userService: UserService, public deviceService: DeviceDetectorService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.rol = new Rol();
    this.rol.id = 3;
    this.rol.rolNombre = 'ROLE_FAMILIAR';

    this.animacionService.createScene(this.rendererCanvas);
    this.animacionService.animate();
    this.hide = true;
    this.disabled = false;

    this.userService.getFamiliares(3).subscribe(data => {
      usuarios = data;
      console.log(usuarios);
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  onLogin(): void {
    this.usuario = new LoginUsuario(this.form.nombreUsuario, this.form.password);

    this.authService.login(this.usuario).subscribe(data => {
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);

      this.authService.getUser(data.nombreUsuario).subscribe(data => {
        this.tokenService.setId(data.id);
      },
        (error: any) => {
          console.log(error)
        }
      );

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
        this.snackService.errorSnackbar('Usuario o contraseña incorrectos');
      },
      () => {
        if(this.isLogged = true) {
          console.log(this.usuario.id);
          if(this.tokenService.isLoggedIn() && this.roles[0] == 'ROLE_USER')
            this.router.navigate(['home']);
          else if(this.tokenService.isLoggedIn() && this.roles[0] == 'ROLE_ADMIN')
            this.router.navigate(['adminhome']);
          else if(this.tokenService.isLoggedIn() && this.roles[0] == 'ROLE_FAMILIAR')
            this.router.navigate(['familiarhome']);
          console.log(this.roles[0]);
          this.snackService.successSnackbar('Inicio de sesión correcto');
        } else {
          console.log("Error al iniciar sesión");
        }
      }
    );
  }
}

export var usuarios: Usuario[] = [];
