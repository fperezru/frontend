import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { DiarioService } from 'src/app/core/services/diarioService/diario.service';
import { Diario } from 'src/app/core/clases/clases';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent extends MatPaginatorIntl {

  displayedColumns: string[] = ['fecha', 'titulo', 'mostrar'];
  columsnToDisplay: string[] = this.displayedColumns.slice();
  dataSource = null;
  fecha: Date;
  visible: boolean = true;
  fechaAux: string;
  fechaPaginaAux: string;
  fechaBoton: Date;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(public dialogoService: DialogoService, private diarioService: DiarioService, private tokenService: TokenService, public datepipe: DatePipe) {
    super();
    this.nextPageLabel = 'Siguiente'
    this.previousPageLabel = 'Anterior';
    this.itemsPerPageLabel = 'Elementos por página';
    this.firstPageLabel = 'Primera página';
    this.lastPageLabel = 'Última página';
    this.datepipe = new DatePipe('en');
  }

  ngOnInit(): void {
    this.loadDiario();
    this.comprobarDiario();
    this.fechaBoton = new Date();
    this.fechaBoton.setHours(0,0,0,0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public loadDiario() {
    this.diarioService.getDiarioUser(this.tokenService.getId()).subscribe(
      paginas => {
        this.dataSource = new MatTableDataSource<Diario>(paginas);
        this.dataSource.paginator = this.paginator;
        const defaultPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data, filter) => {
      const formatted = this.datepipe.transform(data.created, 'dd/MM/yyyy');
      return formatted.indexOf(filter) >= 0 || defaultPredicate(data, filter);
    }
      },
      error => console.log(error)
    );
  }

  public addPagina() {
    this.fecha = new Date();
    this.fecha.setHours(0,0,0,0);
    this.dialogoService.abrirDialogo('NuevaPaginaComponent', this.fecha, {width: '1100px', height: 'auto'}).afterClosed().subscribe(data => {
      this.loadDiario();
      this.comprobarDiario();
      this.dataSource._updateChangeSubscription();
    },
    error => console.log(error)
    );

  }

  public comprobarDiario() {
    var fecha = new Date();
    this.fechaAux = this.datepipe.transform(fecha, 'dd/MM/yyyy', 'es-ES');
    this.diarioService.getDiarioUser(this.tokenService.getId()).subscribe(
      pagina => {
        for (let i = 0; i < pagina.length; i++) {
          var fechaPagina = new Date(pagina[i].fecha);
          this.fechaPaginaAux = this.datepipe.transform(fechaPagina, 'dd/MM/yyyy', 'es-ES');
          console.log(this.fechaAux + "|" + fechaPagina);
          if (this.fechaAux == this.fechaPaginaAux) {
            this.visible = false;
          }
          else
            this.visible = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public visibleBoton(fecha: Date) {
    let visible = true;
    var fechaAux = new Date(fecha);
    fechaAux.setHours(0,0,0,0);

    if(fechaAux.getTime() === this.fechaBoton.getTime())
      visible = true;
    else 
      visible = false;
      
    return visible;

  }
}
