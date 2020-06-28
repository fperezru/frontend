import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Persona } from 'src/app/core/clases/clases';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { LoginUsuario } from 'src/app/core/clases/clases';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { InterfazPersonasService } from 'src/app/core/services/interfaz-personas/interfaz-personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];
  usuario: LoginUsuario;
  id: Number;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private personaService: PersonaService, public tokenService: TokenService, public dialogoService: DialogoService, private interfazPersonas: InterfazPersonasService) { }

  ngOnInit(): void {
    this.cargarPersonas();

    this.interfazPersonas.createScene(this.rendererCanvas);
    this.interfazPersonas.animate();
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

  public openMenu() {
    this.dialogoService.abrirDialogo('NuevaPersonaComponent', this.tokenService.getId(), {width: '1100px', height: 'auto'}).afterOpened().subscribe(data => {
     this.interfazPersonas.stop();
    },
    error => console.log(error)
    );
  }
}
