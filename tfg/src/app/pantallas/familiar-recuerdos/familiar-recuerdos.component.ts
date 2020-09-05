import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-familiar-recuerdos',
  templateUrl: './familiar-recuerdos.component.html',
  styleUrls: ['./familiar-recuerdos.component.scss']
})
export class FamiliarRecuerdosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tiles: Tile[] = [
    {text: 'Personas', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Mascotas', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Viajes', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Otros recuerdos', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}