import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-nueva-persona',
  templateUrl: './nueva-persona.component.html',
  styleUrls: ['./nueva-persona.component.scss']
})
export class NuevaPersonaComponent implements OnInit {

  idUser: Number;

  constructor(private dialogoRef: MatDialogRef<NuevaPersonaComponent>, @Inject(MAT_DIALOG_DATA) public data:Number,) { }

  ngOnInit(): void {
    if(this.data !== null){
      this.idUser = this.data;
      console.log(this.idUser);
    }
  }

}
