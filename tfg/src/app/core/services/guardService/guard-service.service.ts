import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../tokenService/token-service.service';
@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  realRol: string;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.tokenService.isLoggedIn()) {
      return true;
    } else {
      this.tokenService.logOut();
      this.router.navigate(["login"]);
    }

    return false;
  }

  constructor(private tokenService: TokenService, private router: Router) { }
}
