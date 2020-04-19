import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/core/clases/clases';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { LoginUsuario } from 'src/app/core/clases/clases';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];
  usuario: LoginUsuario;
  id: Number;

  constructor(private personaService: PersonaService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.id = this.tokenService.getId();
    console.log(this.tokenService.getUserName());
    console.log(this.id);
    this.personaService.getPersonasPorUser(this.id).subscribe(data => {
      this.personas = data;
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.personaService.borrar(id).subscribe(data => {
        this.cargarPersonas();
      });
    }
  }
}
