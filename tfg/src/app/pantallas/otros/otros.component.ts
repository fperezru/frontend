import { Component, OnInit } from '@angular/core';
import { OtrosRecuerdos, LoginUsuario } from 'src/app/core/clases/clases';
import { OtroService } from 'src/app/core/services/otro/otro.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.scss']
})
export class OtrosComponent implements OnInit {

  otros: OtrosRecuerdos[] = [];
  usuario: LoginUsuario;
  id: Number;

  constructor(private otroService: OtroService, public tokenService: TokenService, public dialogoService: DialogoService) { }

  ngOnInit(): void {
    this.cargarRecuerdos();
  }

  cargarRecuerdos(): void {
    this.id = this.tokenService.getId();
    console.log(this.tokenService.getUserName());
    console.log(this.id);
    this.otroService.getRecuerdosPorUser(this.id).subscribe(data => {
      this.otros = data;
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.otroService.borrar(id).subscribe(data => {
        this.cargarRecuerdos();
      });
    }
  }

}
