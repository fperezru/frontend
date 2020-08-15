import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as ClassicEditor from '../../../../ckeditor5-build-classic';

@Component({
  selector: 'app-info-editor',
  templateUrl: './info-editor.component.html',
  styleUrls: ['./info-editor.component.scss']
})
export class InfoEditorComponent implements OnInit {
  @Input()
  informacion: string;

  @Output()
  informacionChange = new EventEmitter<string>();

  public Editor = ClassicEditor;
  public editar;

  constructor() { }

  ngOnInit(): void {
    console.log(this.editar);
  }

  updateInfo(event) {
    this.informacion = event;
    this.informacionChange.emit(this.informacion);
  }

}
