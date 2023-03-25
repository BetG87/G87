import { Component } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent {

isborderli = [false, false, false,false,false,false];
selectedTab: number = 0;

activeInfo(index: number) {
  this.selectedTab = index;
    for (let i = 0; i < this.isborderli.length; i++) {
      this.isborderli[i] = i === index;
     
    }
  }
}
