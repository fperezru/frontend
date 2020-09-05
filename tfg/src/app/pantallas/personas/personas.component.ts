import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Persona } from 'src/app/core/clases/clases';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { Usuario } from 'src/app/core/clases/clases';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { InterfazPersonasService } from 'src/app/core/services/interfaz-personas/interfaz-personas.service';
import { AuthService } from 'src/app/core/services/authService/auth-service.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];
  usuario: Usuario;
  id: Number;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private personaService: PersonaService, public tokenService: TokenService, public dialogoService: DialogoService, private interfazPersonas: InterfazPersonasService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.authService.getUser(this.tokenService.getUserName()).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario.permiso);
    },
      (error: any) => {
        console.log(error)
      }
    );
    
    this.interfazPersonas.createScene(this.rendererCanvas);
    this.interfazPersonas.animate();
  }

  

  public openMenu() {
    this.dialogoService.abrirDialogo('NuevaPersonaComponent', this.tokenService.getId(), {width: '1100px', height: 'auto'}).afterOpened().subscribe(data => {
     this.interfazPersonas.stop();
    },
    error => console.log(error)
    );
  }
}
