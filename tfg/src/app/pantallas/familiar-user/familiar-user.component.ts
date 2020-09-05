import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';
import { Usuario } from 'src/app/core/clases/clases';
import { UserService } from 'src/app/core/services/user/user.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-familiar-user',
  templateUrl: './familiar-user.component.html',
  styleUrls: ['./familiar-user.component.scss']
})
export class FamiliarUserComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'email', 'nombre', 'acciones'];
  columsnToDisplay: string[] = this.displayedColumns.slice();
  dataSource = null;
  usuarios: Usuario[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(public dialogoService: DialogoService, private usuarioService: UserService, private tokenService: TokenService, public deviceService: DeviceDetectorService ) { }

  ngOnInit(): void {
    console.log(this.tokenService.getId());
    this.loadUsuarios();
  }

  public loadUsuarios() {
    this.usuarioService.getPacientes(this.tokenService.getId()).subscribe(
      usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log(error)
    );
  }

  public setFamiliar(id: number) {
    this.tokenService.setIdUsuario(id);
  }

}
