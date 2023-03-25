import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from './account';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

  export class AccountInfoComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public formChangePass :FormGroup | any
  id: any;
  nameAccount: any;
  nameBank : any;
  numberBank: any;
  
  gameLists:any;
  selectGame: any;

  
isborderli = [false, false, false,false,false,false];
selectedTab: number = 0;

activeInfo(index: number) {
  this.selectedTab = index;
    for (let i = 0; i < this.isborderli.length; i++) {
      this.isborderli[i] = i === index;
     
    }
  }

  accounts: Account[] = [
    { id: 1, nameAccount: 'John', nameBank: 'xx' ,numberBank: 123231231},
    { id: 2, nameAccount: 'John', nameBank: 'xx' ,numberBank: 123231231},
    { id: 3, nameAccount: 'John', nameBank: 'xx' ,numberBank: 123231231},
  ];
}
