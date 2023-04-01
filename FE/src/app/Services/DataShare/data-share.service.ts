import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  public dataNav = new Subject();
  public dataUser = new Subject();
  private token :string  = "";


  getToken():string  {
    return this.token;
  }
  setToken(token:string):void{
    this.token = token;
  }

  senddata() {
    this.dataNav.next(0);
  }
  setDataUser(data: any) {
    this.dataUser.next(data);
  }
  constructor() { }
}
