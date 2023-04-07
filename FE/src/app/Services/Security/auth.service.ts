import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper :JwtHelperService) { }

  public isAuthenticated():boolean{
    const token = sessionStorage.getItem('auth-token');
    // const OBJ:Object = this.jwtHelper.decodeToken(token)

    // console.log(!this.jwtHelper.isTokenExpired(token))
    // console.log(OBJ['role']=="ROLE_ADMIN")

    return !this.jwtHelper.isTokenExpired(token)
  }
}
