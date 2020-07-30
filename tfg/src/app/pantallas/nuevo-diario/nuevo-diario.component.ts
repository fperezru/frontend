import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as ClassicEditor from '../../../../ckeditor5-build-classic';
import { noEdit } from '../editar-pagina/editar-pagina.component';

@Component({
  selector: 'app-nuevo-diario',
  templateUrl: './nuevo-diario.component.html',
  styleUrls: ['./nuevo-diario.component.scss']
})
export class NuevoDiarioComponent implements OnInit {
  @Input()
  diario: string;

  @Output()
  diarioChange = new EventEmitter<string>();

  public Editor = ClassicEditor;
  public editar;
  
  constructor() { }

  ngOnInit(): void {
    this.editar = noEdit;
    console.log(this.editar);
  }

  updatePagina(event) {
    this.diario = event;
    this.diarioChange.emit(this.diario);
  }

}
