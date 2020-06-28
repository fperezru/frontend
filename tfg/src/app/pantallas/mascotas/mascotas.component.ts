import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Mascota } from 'src/app/core/clases/clases';
import { LoginUsuario } from 'src/app/core/clases/clases';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { InterfazService } from 'src/app/core/services/interfaz.service';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {

  mascotas: Mascota[] = [];
  usuario: LoginUsuario;
  id: Number;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private mascotaService: MascotaService, public tokenService: TokenService, public dialogoService: DialogoService, private interfaz: InterfazService) { }

  ngOnInit(): void {
    this.cargarMascotas();

    this.interfaz.createScene(this.rendererCanvas);
    this.interfaz.animate();
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
