import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { Usuario } from 'src/app/core/clases/clases';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.scss']
})
export class AdminConfigComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'contraseña', 'nombre', 'editar'];
  columsnToDisplay: string[] = this.displayedColumns.slice();
  dataSource = null;
  usuarios: Usuario[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogoService: DialogoService, private usuarioService: UserService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  public loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log(error)
    );
  }
}
