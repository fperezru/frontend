import { Component, OnInit } from '@angular/core';
import { Viaje, LoginUsuario } from 'src/app/core/clases/clases';
import { ViajeService } from 'src/app/core/services/viaje/viaje.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss']
})
export class ViajesComponent implements OnInit {

  viajes: Viaje[] = [];
  usuario: LoginUsuario;
  id: Number;

  constructor(private viajeService: ViajeService, public tokenService: TokenService, public dialogoService: DialogoService) { }

  ngOnInit(): void {
    this.cargarViajes();
  }

  cargarViajes(): void {
    this.id = this.tokenService.getId();
    console.log(this.tokenService.getUserName());
    console.log(this.id);
    this.viajeService.getViajesPorUser(this.id).subscribe(data => {
      this.viajes = data;
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.viajeService.borrar(id).subscribe(data => {
        this.cargarViajes();
      });
    }
  }

}
