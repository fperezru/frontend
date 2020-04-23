import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { Persona } from 'src/app/core/clases/clases';
@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.scss']
})
export class OtrosComponent implements OnInit {

  form: any = {};
  persona: Persona;
  creado = false;
  failProducto = false;
  mensajeFail = '';
  mensajeOK = '';

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    
  }

  volver(): void {
    window.history.back();
  }

}
