import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NuevoUsuario } from 'src/app/core/clases/clases';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  user: NuevoUsuario;
  menuOpen = true;
  roles: string[];

  @Output() menuOpenEvent = new EventEmitter();

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    console.log(this.roles);
  }

  toggleSideNav() {
    this.menuOpen = !this.menuOpen;
    this.menuOpenEvent.emit(this.menuOpen);
  }

}
