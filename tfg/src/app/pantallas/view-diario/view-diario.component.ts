import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiarioService } from 'src/app/core/services/diarioService/diario.service';
import { Diario } from 'src/app/core/clases/clases';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-diario',
  templateUrl: './view-diario.component.html',
  styleUrls: ['./view-diario.component.scss']
})
export class ViewDiarioComponent implements OnInit {
  public diario: Diario;
  fechaAux: string;
  editAux: boolean;
  html: any;


  constructor(public dialogoRef: MatDialogRef<ViewDiarioComponent>, private diarioService: DiarioService, @Inject(MAT_DIALOG_DATA) public data: Diario, private tokenService: TokenService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.diario = this.data;
      this.fechaAux = this.datepipe.transform(this.diario.fecha, 'dd/MM/yyyy', 'es-ES');
    }
    else  
      this.diario = this.diario;

    this.html = <HTMLElement>document.createElement('div');
    this.html.innerHTML = this.diario.diario;

    console.log(this.html);
    
  }

}
