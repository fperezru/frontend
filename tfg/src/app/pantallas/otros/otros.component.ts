import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OtrosRecuerdos, Usuario } from 'src/app/core/clases/clases';
import { OtroService } from 'src/app/core/services/otro/otro.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { InterfazOtrosService } from 'src/app/core/services/interfaz-otros/interfaz-otros.service';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.scss']
})
export class OtrosComponent implements OnInit {

  otros: OtrosRecuerdos[] = [];
  usuario: Usuario;
  id: Number;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private otroService: OtroService, public tokenService: TokenService, public dialogoService: DialogoService, public interfazOtros: InterfazOtrosService, private authService: AuthService, public deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.authService.getUser(this.tokenService.getUserName()).subscribe(data => {
      this.usuario = data;
    },
      (error: any) => {
        console.log(error)
      }
    );

    this.interfazOtros.createScene(this.rendererCanvas);
    this.interfazOtros.animate();
  }

  public openMenu() {
    this.dialogoService.abrirDialogo('NuevoOtroComponent', this.tokenService.getId(), {width: 'auto', height: 'auto'}).afterClosed().subscribe(data => {
     this.interfazOtros.back();
    },
    error => console.log(error)
    );
  }

}
