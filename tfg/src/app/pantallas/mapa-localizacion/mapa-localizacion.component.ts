import { Component, OnInit, Inject } from '@angular/core';
import { LocalizacionService } from 'src/app/core/services/localizacion/localizacion.service';
import { Usuario } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { interval } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-mapa-localizacion',
  templateUrl: './mapa-localizacion.component.html',
  styleUrls: ['./mapa-localizacion.component.scss']
})
export class MapaLocalizacionComponent implements OnInit {

  usuario: Usuario
  title = 'gmaps'
  label = {
    color: 'cyan',
    text: 'Marcador'
  }
  zoom = 1200
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  position: google.maps.LatLngLiteral

  constructor(public dialogoRef: MatDialogRef<MapaLocalizacionComponent>, @Inject(MAT_DIALOG_DATA) public data: Usuario, public snackService: SnackService, private localizacionService: LocalizacionService, private tokenService: TokenService, private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    if(this.data !== null) {
      this.usuario = this.data;
    }
    else 
      this.usuario = this.usuario;
    
    this.localizacionService.getLocalizacionPorUser(this.usuario.id).subscribe(
      location => {
        this.position = {
          lat: location[0].latitud,
          lng: location[0].longitud
        }
      },
      error => console.log(error)
    );

    interval(30000).subscribe(x => {
      this.actualizarLocalizacionUsuario();
    });

    this.label.text = this.usuario.nombreUsuario;
  }

  public actualizarLocalizacionUsuario() {
    this.localizacionService.getLocalizacionPorUser(this.usuario.id).subscribe(
      location => {
        this.position = {
          lat: location[0].latitud,
          lng: location[0].longitud
        }
      },
      error => console.log(error)
    );
  }

  public openMaps() {

    if(this.deviceService.isMobile())
      window.open("maps://maps.google.com/maps?daddr="+this.position.lat+","+ this.position.lng+"&amp;ll=");
    else if(this.deviceService.isTablet())
      window.open("maps://maps.google.com/maps?daddr="+this.position.lat+","+ this.position.lng+"&amp;ll="); 
    else if(this.deviceService.isDesktop())
      window.open("https://maps.google.com/maps?daddr="+this.position.lat+","+ this.position.lng+"&amp;ll=");
  }
}

