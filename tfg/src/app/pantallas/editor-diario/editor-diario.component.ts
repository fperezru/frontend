import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as ClassicEditor from '../../../../ckeditor5-build-classic';
import { noEdit } from '../editar-pagina/editar-pagina.component';

@Component({
  selector: 'app-editor-diario',
  templateUrl: './editor-diario.component.html',
  styleUrls: ['./editor-diario.component.scss']
})
export class EditorDiarioComponent implements OnInit {
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
