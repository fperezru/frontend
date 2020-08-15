import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { LocalizacionService } from 'src/app/core/services/localizacion/localizacion.service';
import { Localizacion } from 'src/app/core/clases/clases';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  localizacion: Localizacion;

  constructor(private tokenService: TokenService, private localizacionService: LocalizacionService) { }

  ngOnInit() {
    this.localizacion = new Localizacion();

    interval(30000).subscribe(x => {
      this.actualizarLocalizacionUsuario();
    });
  }

  public actualizarLocalizacionUsuario() {
    navigator.geolocation.getCurrentPosition(position => {
      this.localizacion.latitud = +position.coords.latitude,
      this.localizacion.longitud = +position.coords.longitude,
      console.log(this.localizacion);
      this.localizacionService.getLocalizacionPorUser(this.tokenService.getId()).subscribe(
        localizacion => {
          console.log(localizacion);
          console.log(this.tokenService.getId());
          if(localizacion.length < 1) {
            console.log("No hay localizaciones del usuaurio");
            this.localizacionService.crearLocalizacion(this.localizacion, this.tokenService.getId()).subscribe(
              l => {
                console.log("Localización añadida");
              },
              error => console.log(error)
            );
          }
          else if (localizacion.length >= 1) {
            console.log("Si hay localizaciones del usuario");
            this.localizacionService.editarLocalizacion(this.localizacion, localizacion[0].id).subscribe(
              loc => {
                console.log("Localización actualizada");
              },
              error => console.log(error)
            );
          }
          
        },
        error => console.log(error)
      );
      }
    );
  }

}
