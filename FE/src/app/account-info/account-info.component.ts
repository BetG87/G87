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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyAddbankComponent } from '../my-addbank/my-addbank.component';
import { MyAddmoneyComponent } from '../my-addmoney/my-addmoney.component';
import { MyGetoutmoneyComponent } from '../my-getoutmoney/my-getoutmoney.component';
import { GameProduct } from '../entity/GameProduct';
import { AccountInfo } from '../entity/AccountInfo';
import { Transaction } from '../entity/transaction';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent implements OnInit {

  public formAccountinfo: FormGroup | any
  public formChangePass: FormGroup | any
  public formDeposit: FormGroup | any
  public formWithDrawal: FormGroup | any
  id: any;
  nameAccount: any;
  nameBank: any;
  numberBank: any;
  moneySend: any;
  daysend: any;
  statusSend: any;
  noteSend: any;
  gameProduct: any;
  gameAccount: [] = [];
  selectGame: any;
  selectGameDeposit: any
  selectGameWithDrawal:any
  isborderli = [true, false, false, false, false, false];
  selectedTab: number = 0;
  username?: string;
  usernameAcccount?: string;
  passwordAcccount?: string;
  isLoggedIn: boolean = false;
  bankNameLists: any;
  accountBankSend: any
  accountBankReceive: any
  accountBankAdmin: Account[] = [];
  userId: string = "";
  accounts: Account[] = [];
  allStatus:any
  defaultStatus: any;
  depositTransaction: Transaction[] = []
  withDrawalTransaction: Transaction[] = []
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
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
    this.formDeposit = this.fb.group({
      amount: ['', Validators.required],
      type: ['deposit', Validators.required],
      bankAccount: ['', Validators.required],
      bankAccountAdmin: ['', Validators.required],
      status: ['', Validators.required],
      gameProduct: ['', Validators.required],
      note: ['', Validators.required],
      user: ['', Validators.required],
    })
    this.formWithDrawal = this.fb.group({
      amount: ['', Validators.required],
      type: ['withdrawal', Validators.required],
      bankAccount: ['', Validators.required],
      status: ['', Validators.required],
      gameProduct: ['', Validators.required],
      user: ['', Validators.required],
    })

    const user = this.sessionStore.getUser()
    this.userId = user['_id'];
    this.username = user['username']

  }

  ngOnInit(): void {
    this.connectApi.get('v1/bank').subscribe((response) => {
      console.log(response)
      this.bankNameLists = response;
    });
    this.connectApi.get('v1/status').subscribe((response: any) => {
      this.allStatus = response
      this.defaultStatus =response[0]['_id']
      })
    this.connectApi.get('v1/user/' + this.userId).subscribe((response: any) => {
      console.log(response)
      var bankAccount = response['bankAccounts']
      console.log(bankAccount)
      this.formAccountinfo.patchValue(response);
      this.gameProduct = response['gameProduct'];
      this.selectGame = this.gameProduct[0]._id
      this.gameAccount = response['gameAccounts']
      if (response['gameProduct'] != null && this.gameAccount == response['gameAccounts'])
    {
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
    }
      console.log(bankAccount)
      

      console.log(bankAccount)
      console.log(this.bankNameLists)

      bankAccount.filter((bankA: any) => {
        var bankC = this.bankNameLists.find((p: { _id: any; }) => p._id === bankA['bankId']);
        console.log(bankC)
        var value = new Account();
        value._id = bankA["_id"]
        value.nameAccount = bankA['ownerName'];
        value.nameBank = bankC['name'];
        value.numberBank = bankA['bankAccountNumber'];
        this.accounts.push(value);

      })
      this.accountBankSend = this.accounts[0]._id
      this.connectApi.get('v1/bankaccount/admin').subscribe((response: any) => {
        response.filter((bankA: any) => {
          var bankC = this.bankNameLists.find((p: { _id: any; }) => p._id === bankA['bankId']);
          console.log(bankC)
          var value = new Account();
          value._id = bankA["_id"]
          value.nameAccount = bankA['ownerName'];
          value.nameBank = bankC['name'];
          value.numberBank = bankA['bankAccountNumber'];
          this.accountBankAdmin.push(value);
        })
        this.accountBankReceive = this.accountBankAdmin[0]._id
      })

      this.connectApi.get('v1/transaction/user/' + this.userId).subscribe((response: any) => {
        console.log(response)
        response.filter((de :any) => {
          if (de['type'] == 'deposit') {
            console.log(de['type'])
            var value = new Transaction();
            value.amount = de['amount']
            value.date = de['date']
            value.note = de['note']
            this.allStatus.filter((status: any) => {
              if (de['status'] == status['_id']) {
                value.status = status['name']
              }
             
            })

            this.depositTransaction.push(value)
          }
          else {
            console.log(de['type'])
            var value = new Transaction();
            value.amount = de['amount']
            value.date = de['date']
            this.allStatus.filter((status: any) => {
              if (de['status'] == status['_id']) {
                value.status = status['name']
              }
             
            })
            this.withDrawalTransaction.push(value)
          }
        })
      })
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

  addBank() {
    const modalRef = this.modalService.open(MyAddbankComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  depositBank() {
    
    this.formDeposit.get('bankAccount').setValue(this.accountBankSend);
    this.formDeposit.get('bankAccountAdmin').setValue(this.accountBankReceive);
    this.formDeposit.get('gameProduct').setValue(this.selectGameDeposit)
    this.formDeposit.get('status').setValue(this.defaultStatus)
    this.formDeposit.get('user').setValue(this.userId);
      this.connectApi.post('v1/transaction', this.formDeposit.value).subscribe((response: any) => {
        console.log(response)
        const modalRef = this.modalService.open(MyAddmoneyComponent, { size: "sm", backdrop: "static", keyboard: false });
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
      })
    var senderName: string = ""
    var senderNumber: string = ""
    console.log(this.accounts)
    console.log(this.accountBankSend)
    this.accounts.filter((value: any) => {
      console.log(value)
      console.log("C" + value['_id'])
      console.log("D:" + this.accountBankSend)
      if (value['_id'] == this.accountBankSend) {
        senderName = value['nameAccount']
        senderNumber = value['numberBank']
        
      }
    })
    var recevieName: string = ""
    var recevieNumber: string = ""
    console.log(this.accountBankAdmin)
    console.log(this.accountBankReceive)
    this.accountBankAdmin.filter((value: any) => {
      console.log(value)
      console.log("A:" + value['_id'])
      console.log("B:" + this.accountBankReceive)
      if (value['_id'] == this.accountBankReceive) {

        recevieName = value['nameAccount']
        recevieNumber = value['numberBank']
      }
    })
    const meessage = {
      message: "User: *" + this.username + " NẠP TIỀN*\n"
        + "Tên người gửi: *" + senderName + "* \n"
        + "Số tài khoản người gửi: *" + senderNumber + "* \n"
        + "Tên người nhận: *" + recevieName + "* \n"
        + "Số tài khoản người nhận: *" + recevieNumber + "* \n"
        + "Số tiên: *" + this.formDeposit.get('amount').value + "* \n"
        + "Ghi chú: *" + this.formDeposit.get('note').value +"*"

    }
    console.log (meessage)
    this.connectApi.post('v1/telegram', meessage).subscribe((response: any) => {
      console.log(response)
    })
  }
  withdrawalBank() {
    const modalRef = this.modalService.open(MyGetoutmoneyComponent, { size: "sm", backdrop: "static", keyboard: false });
    this.formWithDrawal.get('bankAccount').setValue(this.accountBankSend);
    this.formWithDrawal.get('gameProduct').setValue(this.selectGameWithDrawal)
    this.formWithDrawal.get('status').setValue(this.defaultStatus)
    this.formWithDrawal.get('user').setValue(this.userId);
    this.connectApi.post('v1/transaction', this.formWithDrawal.value).subscribe((response: any) => {
      console.log(response)
      var game = this.gameProduct.find((p: { _id: any; }) => p._id === this.selectGameWithDrawal);

      var senderName: string = ""
      var senderNumber: string = ""
      console.log(this.accounts)
      console.log(this.accountBankSend)
      this.accounts.filter((value: any) => {
        console.log(value)
        console.log("C" + value['_id'])
        console.log("D:" + this.accountBankSend)
        if (value['_id'] == this.accountBankSend) {
          senderName = value['nameAccount']
          senderNumber = value['numberBank']

        }
      })
      var recevieName: string = ""
      var recevieNumber: string = ""
      console.log(this.accountBankAdmin)
      console.log(this.accountBankReceive)
      this.accountBankAdmin.filter((value: any) => {
        console.log(value)
        console.log("A:" + value['_id'])
        console.log("B:" + this.accountBankReceive)
        if (value['_id'] == this.accountBankReceive) {

          recevieName = value['nameAccount']
          recevieNumber = value['numberBank']
        }
      })
      const meessage = {
        message: "User: *" + this.username + " RÚT TIỀN*\n"
          + "Tên: *" + senderName + "* \n"
          + "Số tài nhận: *" + senderNumber + "* \n"
          + "Số tiên: *" + this.formWithDrawal.get('amount').value + "* \n"
          + "Game: *" + game['name'] + "* \n"

      }
      console.log(meessage)
      this.connectApi.post('v1/telegram', meessage).subscribe((response: any) => {
        console.log(response)
      })
    })
  }

}
