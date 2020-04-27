import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { Mascota } from 'src/app/core/clases/clases';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuario } from 'src/app/core/clases/clases';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {

  mascotas: Mascota[] = [];
  usuario: LoginUsuario;
  id: Number;

  constructor(private mascotaService: MascotaService, public tokenService: TokenService, public dialogoService: DialogoService) { }

  ngOnInit(): void {
    this.cargarMascotas();

  }

  cargarMascotas(): void {
    this.id = this.tokenService.getId();
    console.log(this.tokenService.getUserName());
    console.log(this.id);
    this.mascotaService.getMascotasPorUser(this.id).subscribe(data => {
      this.mascotas = data;
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.mascotaService.borrar(id).subscribe(data => {
        this.cargarMascotas();
      });
    }
  }

 
}
