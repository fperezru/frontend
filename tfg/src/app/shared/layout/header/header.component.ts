import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/core/clases/clases';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  usuario: Usuario;
  permiso: boolean = true;
  menuOpen = true;
  roles: string[];

  @Output() menuOpenEvent = new EventEmitter();

  constructor(public tokenService: TokenService, public authService: AuthService, public dialogoService: DialogoService, public deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    console.log(this.roles);

    this.authService.getUser(this.tokenService.getUserName()).subscribe(data => {
      this.usuario = data;
      this.permiso = this.usuario.permiso;
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  toggleSideNav() {
    this.menuOpen = !this.menuOpen;
    this.menuOpenEvent.emit(this.menuOpen);
  }

}
