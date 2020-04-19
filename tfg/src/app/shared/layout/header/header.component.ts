import { Component, OnInit, Input } from '@angular/core';
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

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
  }

}
