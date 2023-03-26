import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { GameProduct } from '../entity/GameProduct';
import { AccountInfo } from '../entity/AccountInfo';

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
  gameProduct: any;
  gameAccount: [] =[];
    selectGame: any;
  isborderli = [true, false, false,false,false,false];
  selectedTab: number = 0;
  username?: string;
  usernameAcccount?: string;
  passwordAcccount?: string;
  isLoggedIn: boolean = false;
   userId: string ="";
  constructor(private dataShare: DataShareService, 
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal, private fb: FormBuilder) {
    this.formAccountinfo = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberPhone: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      bankId: ['', Validators.required],
      gameAccount: ['', Validators.required],
      gamePassword: ['', Validators.required],
    });

    const user = this.sessionStore.getUser()
    this.userId = user['_id'];
    
  }

  ngOnInit(): void {
    this.connectApi.get('v1/user/' + this.userId).subscribe((response:any) => {
      console.log(response)
      this.formAccountinfo.patchValue(response);
      this.gameProduct = response['gameProduct'];
      this.selectGame = this.gameProduct[0]._id
      this.gameAccount = response['gameAccounts']
      if (this.gameProduct && this.gameProduct.length > 0 && this.gameAccount && this.gameAccount.length > 0) {
        // Sử dụng gameProduct và gameAccount để lọc dữ liệu
        const filteredUsers = this.gameAccount.filter(user => {
          const product = this.selectGame === user['gameProduct'];
          return product;
          
        });
        this.formAccountinfo.get('gameAccount').setValue(filteredUsers[0]['username']);
        this.formAccountinfo.get('gamePassword').setValue(filteredUsers[0]['password']);
      } else {
        console.log('Không có dữ liệu để lọc');
      }

    });

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
    if (this.gameProduct && this.gameProduct.length > 0 && this.gameAccount && this.gameAccount.length > 0) {
      // Sử dụng gameProduct và gameAccount để lọc dữ liệu
      const filteredUsers = this.gameAccount.filter(user => {
        const product = event === user['gameProduct'];
        return product;

      });
      this.formAccountinfo.get('gameAccount').setValue(filteredUsers[0]['username']);
      this.formAccountinfo.get('gamePassword').setValue(filteredUsers[0]['password']);
    } else {
      console.log('Không có dữ liệu để lọc');
    }
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
