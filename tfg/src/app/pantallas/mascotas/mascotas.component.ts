import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Mascota } from 'src/app/core/clases/clases';
import { Usuario } from 'src/app/core/clases/clases';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { InterfazService } from 'src/app/core/services/interfaz.service';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {

  mascotas: Mascota[] = [];
  usuario: Usuario;
  permiso: boolean = true;
  id: Number;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private mascotaService: MascotaService, public tokenService: TokenService, public dialogoService: DialogoService, public interfaz: InterfazService, private authService: AuthService, public deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.authService.getUser(this.tokenService.getUserName()).subscribe(data => {
      this.usuario = data;
      this.permiso = this.usuario.permiso;
    },
      (error: any) => {
        console.log(error)
      }
    );

    this.interfaz.createScene(this.rendererCanvas);
    this.interfaz.animate();
  }

  public openMenu() {
    this.dialogoService.abrirDialogo('NuevaMascotaComponent', this.tokenService.getId(), {width: '1100px', height: 'auto'}).afterClosed().subscribe(data => {
     this.interfaz.back();
    },
    error => console.log(error)
    );
  }

}
