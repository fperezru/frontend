import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/core/clases/clases';
import { PersonaService } from 'src/app/core/services/persona/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe(data => {
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
