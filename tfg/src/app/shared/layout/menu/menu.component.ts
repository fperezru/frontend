import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  roles: string[];

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
  }

}
