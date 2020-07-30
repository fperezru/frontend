import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../tokenService/token-service.service';
@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  realRol: string[];

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.realRol = this.tokenService.getAuthorities();
    console.log(this.realRol[0]);
    if(this.tokenService.isLoggedIn() && this.realRol[0] == 'ROLE_USER') {
      return true;
    } else if(this.tokenService.isLoggedIn() && this.realRol[0] == 'ROLE_ADMIN') {
      return true;
    } else if(this.tokenService.isLoggedIn() && this.realRol[0] == 'ROLE_FAMILIAR') {
      return true;
    } else  {
      this.tokenService.logOut();
      this.router.navigate(["login"]);
    }

    return false;
  }

  constructor(private tokenService: TokenService, private router: Router) { }
}
