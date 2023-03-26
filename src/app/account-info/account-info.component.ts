import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from '../entity/account';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; 
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode'
import { AccountSend } from '../entity/accountSend';
import { accountPutOut } from '../entity/accountPutOut';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyAddbankComponent } from '../my-addbank/my-addbank.component';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent implements OnInit {

    public formAccountinfo: FormGroup | any
    public formChangePass :FormGroup | any
    id: any;
    nameAccount: any;
    nameBank : any;
    numberBank: any;
    moneySend: any;
    daysend : any ;
    statusSend : any ;
    noteSend : any ;
    gameLists:any;
    selectGame: any;
  isborderli = [true, false, false,false,false,false];
  selectedTab: number = 0;
  username?: string;
  isLoggedIn: boolean = false;
   userId: string ="";
  constructor(private dataShare: DataShareService, 
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal) {
    const user = this.sessionStore.getUser()
    this.userId = user['_id'];
    this.connectApi.get('v1/user/' + this.userId).subscribe((response) => {
      console.log(response)
    });
  }

  ngOnInit(): void {
    console.log("abvcs")

  }
  public onSubmit(): void {

  }
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
  accountSend : AccountSend [] =[
    { moneySend: 1, daySend: 'John', statusSend: 'xx' , noteSend: "đã gửi"},
    { moneySend: 1, daySend: 'John', statusSend: 'xx' , noteSend: "đã gửi"},
    { moneySend: 1, daySend: 'John', statusSend: 'xx' , noteSend: "đã gửi"},
  ]
  accountPutOut : accountPutOut [] =[
    { moneyPutOut: 1, dayPutOut: 'John', statusPutOut: 'xx' , notePutOut: "đã gửi"},
    { moneyPutOut: 1, dayPutOut: 'John', statusPutOut: 'xx' , notePutOut: "đã gửi"},
    { moneyPutOut: 1, dayPutOut: 'John', statusPutOut: 'xx' , notePutOut: "đã gửi"},
  ]

  onGameChange(event: any): void {
    console.log(event);
  }

  addBank(){
    const modalRef = this.modalService.open(MyAddbankComponent,{ size: "md", backdrop: "static", keyboard: false });
    modalRef.result.then((result: any) => {
      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  
  
}
