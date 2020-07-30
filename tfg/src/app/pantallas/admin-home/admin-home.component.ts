import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPacientes(5).subscribe(data => {
      for(var i = 0; i < data.length; i++) {
        console.log(data[i].nombreUsuario);
      }
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

}
