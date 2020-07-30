import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { InformacionService } from 'src/app/core/services/informacion/informacion.service';
import { Informacion } from 'src/app/core/clases/clases';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.scss']
})
export class AdminInfoComponent extends MatPaginatorIntl {

  displayedColumns: string[] = ['titulo', 'tipo', 'administrador', 'acciones'];
  columsnToDisplay: string[] = this.displayedColumns.slice();
  dataSource = null;
  user: string;
  informaciones: Informacion[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogoService: DialogoService, private informacionService: InformacionService, private tokenService: TokenService) {
    super();
    this.nextPageLabel = 'Siguiente'
    this.previousPageLabel = 'Anterior';
    this.itemsPerPageLabel = 'Elementos por página';
    this.firstPageLabel = 'Primera página';
    this.lastPageLabel = 'Última página';
   }

  ngOnInit(): void {
    this.loadInformaciones();
    this.informaciones = [];
  }

  public loadInformaciones() {
    this.informacionService.getInformacion().subscribe(
      informacion => {
        /*for(let i = 0; i < informacion.length; i++) {
          if(Number(informacion[i].tipo) == 1)
            informacion[i].tipo = eval("ALIMENTACION");
          
          if(Number(informacion[i].tipo) == 2)
            informacion[i].tipo = eval("EJERCICIOS");
          
          if(Number(informacion[i].tipo) == 3)
            informacion[i].tipo = eval("ENFERMEDAD");
          
          if(Number(informacion[i].tipo) == 4)
            informacion[i].tipo = eval("ORGANIZACIONES");
        }*/
        
        this.informaciones = informacion
        for(let i = 0; i < this.informaciones.length; i++) {
          if (Number(this.informaciones[i]) == 1)
            this.informaciones[i].tipo.tipoNombre == "ALIMENTACION";
          if (Number(this.informaciones[i]) == 2)
            this.informaciones[i].tipo.tipoNombre == "EJERCICIOS";
          if (Number(this.informaciones[i]) == 3)
            this.informaciones[i].tipo.tipoNombre == "ENFERMEDAD";
          if (Number(this.informaciones[i]) == 4)
            this.informaciones[i].tipo.tipoNombre == "ORGANIZACIONES";
        }
        this.dataSource = new MatTableDataSource<Informacion>(this.informaciones);
        console.log(Number(this.informaciones[0]));
        this.dataSource.paginator = this.paginator;
      },
      error => console.log(error)
    );
  }

  public addInformacion() {
    this.user = this.tokenService.getUserName();
    this.dialogoService.abrirDialogo('NuevaInformacionComponent', this.user, {width: '1100px', height: 'auto'}).afterClosed().subscribe(data => {
      this.loadInformaciones();
    },
    error => console.log(error)
    );
  }
}
