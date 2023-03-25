import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor() { }
  public setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    date.setDate(date.getTime() + (7 * 24 * 60 * 60 * 1000))
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/"
  }
  public getCookie(name: string)  {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) {
      return parts!.pop()!.split(";").shift()!;
    }
    else return null
  }


  public deleteCookie(name: string) {
    const date = new Date();
    date.setDate(date.getTime() + (-1 * 24 * 60 * 60 * 1000))
    document.cookie = name +"=; expries= "+ date.toUTCString()+"; path:/";
  }
}
