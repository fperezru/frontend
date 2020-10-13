import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { InformacionService } from 'src/app/core/services/informacion/informacion.service';
import { Informacion, Tipo, Usuario } from 'src/app/core/clases/clases';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { usuarios } from '../login/login.component';
import { UserService } from 'src/app/core/services/user/user.service';

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
  tipoAux: Tipo;
  usuarioAux: Usuario;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogoService: DialogoService, private informacionService: InformacionService, private tokenService: TokenService, private userService: UserService) {
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
        for(let i = 0; i < informacion.length; i++) {
          if (Number(informacion[i].tipo) === 1) {
            this.tipoAux = new Tipo();
            this.tipoAux.id = 1;
            this.tipoAux.tipoNombre = "ALIMENTACIÓN";
            informacion[i].tipo = this.tipoAux;
          }
          else if (Number(informacion[i].tipo) === 2) {
            this.tipoAux = new Tipo();
            this.tipoAux.id = 2;
            this.tipoAux.tipoNombre = "EJERCICIOS";
            informacion[i].tipo = this.tipoAux;
          }
          else if (Number(informacion[i].tipo) === 3) {
            this.tipoAux = new Tipo();
            this.tipoAux.id = 3;
            this.tipoAux.tipoNombre = "ENFERMEDAD";
            informacion[i].tipo = this.tipoAux;
          }
          else if (Number(informacion[i].tipo) === 4) {
            this.tipoAux = new Tipo();
            this.tipoAux.id = 4;
            this.tipoAux.tipoNombre = "ORGANIZACIONES";
            informacion[i].tipo = this.tipoAux;
          }
        }

        this.userService.getUsuarios().subscribe(data => {
          for (let i = 0; i < informacion.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if(Number(informacion[i].usuario) === data[j].id) {
                this.usuarioAux = new Usuario();
                this.usuarioAux.id = data[j].id;
                this.usuarioAux.nombreUsuario = data[j].nombreUsuario;
                informacion[i].usuario = this.usuarioAux;
              }
            }
          }
        },
          (error: any) => {
            console.log(error)
          }
        );

        this.dataSource = new MatTableDataSource<Informacion>(informacion);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log(error)
    );
  }

  public addInformacion() {
    this.user = this.tokenService.getUserName();
    this.dialogoService.abrirDialogo('NuevaInformacionComponent', this.user, {width: '1100px', height: 'auto'}).afterClosed().subscribe(data => {
      this.loadInformaciones();
      this.dataSource._updateChangeSubscription();
    },
    error => console.log(error)
    );
  }

  public deleteInformacion(informacion: Informacion) {
    this.informacionService.borrar(informacion.id).subscribe(data => {
      this.loadInformaciones();
    },
      error => console.log(error)
    );
  }
}
