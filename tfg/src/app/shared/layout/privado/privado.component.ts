import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss']
})
export class PrivadoComponent implements OnInit {

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
  }

}
