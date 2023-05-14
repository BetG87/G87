import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../entity/account';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import decode from 'jwt-decode'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyAddbankComponent } from '../my-addbank/my-addbank.component';
import { Transaction } from '../entity/transaction';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { VndFormatPipe } from '../vnd.pipe';
import { NgSelectComponent } from '@ng-select/ng-select';
import { MyModalupdateaccountBankuserComponent } from '../my-modalupdateaccount-bankuser/my-modalupdateaccount-bankuser.component';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';

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
  gameProductAll: any;
  gameProductFullAll: any;
  gameAccount: [] = [];
  selectGame: any;
  selectGameDeposit: any
  selectGameWithDrawal: any
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
  allStatus: any
  defaultStatus: any;
  depositTransaction: Transaction[] = []
  withDrawalTransaction: Transaction[] = []
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  tkGame: any[] = [];
  constructor(private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private vndFormatPipe: VndFormatPipe) {
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
    this.formChangePass = this.fb.group({
      oldPass: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })

    const user = this.sessionStore.getUser()
    this.userId = user['_id'];
    this.username = user['username']

  }

  ngOnInit(): void {
    this.checkInit();
    if (this.isLoggedIn) {
      this.connectApi.get('v1/bank').subscribe((response) => {
        this.bankNameLists = response;
      });
      this.connectApi.get('v1/gameproduct').subscribe((response) => {
        this.gameProductFullAll = response;
        this.gameProductAll = this.gameProductFullAll.filter((g: { isActive: boolean; }) => g.isActive === true);
        this.formDeposit.get('gameProduct').setValue(this.gameProductAll[0]?._id)
        this.formWithDrawal.get('gameProduct').setValue(this.gameProductAll[0]?._id)
      });
      this.connectApi.get('v1/status').subscribe((response: any) => {
        this.allStatus = response
        this.defaultStatus = response[0]['_id']
      })
      this.connectApi.get('v1/user/' + this.userId).subscribe((response: any) => {
        var bankAccount = response['bankAccounts']
        this.formAccountinfo.patchValue(response);
        this.gameProduct = response['gameProduct'];
        this.selectGame = this.gameProduct![0]?._id
        this.gameAccount = response['gameAccounts']
        if (response['gameProduct'] != null && this.gameAccount == response['gameAccounts']) {
          if (this.gameProduct && this.gameProduct.length > 0 && this.gameAccount && this.gameAccount.length > 0) {
            // Sử dụng gameProduct và gameAccount để lọc dữ liệu
            const filteredUsers: any = this.gameAccount.filter((user: any) => {
              console.log(user)
              if (user.isActive) {
                const product = this.selectGame === user['gameProduct'];
                return product;
              }
              else {
                return false
              }
            });
            this.tkGame = []
            this.tkGame.push(filteredUsers)
            console.log(filteredUsers)
            this.tkGame = this.tkGame[0]
            console.log(this.tkGame)
            this.formAccountinfo.get('gameAccount').setValue(this.tkGame[0]['_id']);
            this.formAccountinfo.get('gamePassword').setValue(this.tkGame[0]['password']);
          } else {
          }
        } else {

        }
        this.accounts = []
        bankAccount.filter((bankA: any) => {
          if (bankA?.isActive) {    
          var bankC = this.bankNameLists.find((p: { _id: any; }) => p._id === bankA['bankId']);
          var value = new Account();
          value._id = bankA["_id"]
          value.nameAccount = bankA['ownerName'];
          value.nameBank = bankC['name'];
          value.numberBank = bankA['bankAccountNumber'];
          this.accounts.push(value);
          return true
          }else{
            return false
          }
        })
        console.log(this.accounts)
        this.accountBankSend = this.accounts[0]?._id
        this.accountBankAdmin = []
        this.connectApi.get('v1/bankaccount/admin').subscribe((response: any) => {
          response.filter((bankA: any) => {
            var bankC = this.bankNameLists.find((p: { _id: any; }) => p._id === bankA['bankId']);
            var value = new Account();
            value._id = bankA["_id"]
            value.nameAccount = bankA['ownerName'];
            value.nameBank = bankC['name'];
            value.numberBank = bankA['bankAccountNumber'];
            this.accountBankAdmin.push(value);
          })
          this.accountBankReceive = this.accountBankAdmin[0]?._id
        })
      });
      this.getTransaction()
    }
    const tabValue = this.activeRoute.snapshot.queryParamMap.get('tab');
    if (tabValue !== null) {
      const parsedValue = parseInt(tabValue, 10);
      if (!isNaN(parsedValue)) {
        this.selectedTab = parsedValue;
      }
    }

  }

  getTransaction() {
    this.depositTransaction = []
    this.withDrawalTransaction = []

    this.connectApi.get('v1/transaction/user/' + this.userId).subscribe((response: any) => {
      console.log(response)
      response.filter((de: any) => {
        if (de['isActive'] == true) {
          if (de['type'] == 'deposit') {
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
        }
      })
    })

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
    this.tkGame = []
    if (this.gameProduct && this.gameProduct.length > 0 && this.gameAccount && this.gameAccount.length > 0) {
      // Sử dụng gameProduct và gameAccount để lọc dữ liệu
      const filteredUsers = this.gameAccount.filter((user: any) => {
        if (user.isActive) {
          const product = this.selectGame === user['gameProduct'];
          return product;
        }
        else {
          return false
        }

      });

      this.tkGame.push(filteredUsers)
      this.tkGame = this.tkGame[0]
      this.formAccountinfo.get('gameAccount').setValue(this.tkGame[0]['_id']);
      this.formAccountinfo.get('gamePassword').setValue(this.tkGame[0]['password']);
    } else {
      console.log('Không có dữ liệu để lọc');
    }
  }
  onTKChange(event: any): void {

    const filteredUsers = this.gameAccount.filter(user => {
      const product = event === user['_id'];
      return product;
    });
    this.formAccountinfo.get('gamePassword').setValue(filteredUsers[0]['password']);
  }

  addBank() {
    const modalRef = this.modalService.open(MyAddbankComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.result.then((result: any) => {
      console.log(result);
      if (result === true) {

      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
  depositBank() {
    this.formDeposit.get('bankAccount').setValue(this.accountBankSend);
    this.formDeposit.get('bankAccountAdmin').setValue(this.accountBankReceive);
    this.formDeposit.get('status').setValue(this.defaultStatus)
    this.formDeposit.get('user').setValue(this.userId);
    const title = "Nạp tiền";
    const content = "Bạn có chắc chắn muốn nạp tiền?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "sm", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "user": this.userId,
          "type": "deposit"
        }
        console.log(meessage)
        this.connectApi.post('v1/transaction/checkstatusgreater2', meessage).subscribe((response: any) => {
          console.log(response)
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Nạp Tiền';
            modalRef.componentInstance.contentNotification =
              'Tài khoản của bạn đang có quá 2 lệnh đang chờ xử lý.Vui lòng liên hệ chăm sóc khách hàng';
            modalRef.componentInstance.command = "depositStatus";
            modalRef.result
              .then((result: any) => {
                this.ngOnInit()
              })
              .catch((error: any) => {
                console.log(error);
              });
          } else {
            this.connectApi.post('v1/transaction', this.formDeposit.value).subscribe((response: any) => {
              const modalRef = this.modalService.open(MyModalComponent, { size: "sm", backdrop: "static", keyboard: false });
              modalRef.componentInstance.Notification = "Nạp Tiền";
              modalRef.componentInstance.contentNotification = "  Yêu cầu nạp tiền của bạn đã được gởi đi. Vui lòng đợi trong giây lát.";
              modalRef.result.then((result: any) => {
                console.log(result);
                if (result === true) {
                  var senderName: string = ""
                  var senderNumber: string = ""
                  var bankName: string = ""
                  this.accounts.filter((value: any) => {

                    if (value['_id'] == this.accountBankSend) {
                      console.log(value)
                      senderName = value['nameAccount']
                      senderNumber = value['numberBank']
                      bankName = value['nameBank']
                    }
                  })
                  var recevieName: string = ""
                  var recevieNumber: string = ""
                  this.accountBankAdmin.filter((value: any) => {
                    if (value['_id'] == this.accountBankReceive) {

                      recevieName = value['nameAccount']
                      recevieNumber = value['numberBank']
                    }
                  })
                  var gameName: string = ""
                  this.gameProductAll.filter((value: any) => {
                    if (value['_id'] == this.formDeposit.get('gameProduct').value) {
                      gameName = value['name']
                      console.log(gameName)
                    }
                  })
                  const meessage = {
                    message: "User: *" + this.username + " NẠP TIỀN*\n"
                      + "Tên người gửi: *" + senderName + "* \n"
                      + "Số tài khoản người gửi: *" + senderNumber + "* \n"
                      + "Tên ngân hàng: *" + bankName + "* \n"
                      + "Tên người nhận: *" + recevieName + "* \n"
                      + "Số tài khoản người nhận: *" + recevieNumber + "* \n"
                      + "Số tiên: *" + this.vndFormatPipe.transform(this.formDeposit.get('amount').value) + "* \n"
                      + "Game: *" + gameName + "* \n"
                      + "Ghi chú: *" + this.formDeposit.get('note').value + "*"

                  }
                  console.log(meessage)
                  this.connectApi.post('v1/telegram', meessage).subscribe((response: any) => {
                    console.log(response)
                  })
                  this.getTransaction()
                }
              }).catch((error: any) => {
                console.log(error);
              });
            })
          }
        });
      }
    }).catch((error: any) => {
      console.log(error);
    });

  }
  withdrawalBank() {

    const title = "Rút tiền";
    const content = "Bạn có chắc chắn muốn rút tiền?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "sm", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "user": this.userId,
          "type": "withdrawal"
        }
        console.log(meessage)
        this.connectApi.post('v1/transaction/checkstatusgreater2', meessage).subscribe((response: any) => {
          console.log(response)
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Nạp Tiền';
            modalRef.componentInstance.contentNotification =
              'Tài khoản của bạn đang có quá 2 lệnh đang chờ xử lý.Vui lòng liên hệ chăm sóc khách hàng';
            modalRef.componentInstance.command = "depositStatus";
            modalRef.result
              .then((result: any) => {
                this.ngOnInit()
              })
              .catch((error: any) => {
                console.log(error);
              });
          } else {
            const modalRef = this.modalService.open(MyModalComponent, { size: "sm", backdrop: "static", keyboard: false });
            modalRef.componentInstance.Notification = "Rút TIền";
            modalRef.componentInstance.contentNotification = " Yêu cầu rút tiền của bạn đã được gởi đi. Vui lòng đợi trong giây lát.";
            modalRef.result.then((result: any) => {
              console.log(result);
              if (result === true) {
                this.formWithDrawal.get('bankAccount').setValue(this.accountBankSend);
                this.formWithDrawal.get('status').setValue(this.defaultStatus)
                this.formWithDrawal.get('user').setValue(this.userId);
                console.log(this.formWithDrawal.value)
                this.connectApi.post('v1/transaction', this.formWithDrawal.value).subscribe((response: any) => {
                  console.log(response)
                  var gameName = this.gameProductAll.find((p: { _id: any; }) => p._id === this.formWithDrawal.get('gameProduct').value);

                  var senderName: string = ""
                  var senderNumber: string = ""
                  var bankName: string = ""
                  this.accounts.filter((value: any) => {
                    if (value['_id'] == this.accountBankSend) {
                      senderName = value['nameAccount']
                      senderNumber = value['numberBank']
                      bankName = value['nameBank']
                    }
                  })
                  const meessage = {
                    message: "User: *" + this.username + " RÚT TIỀN*\n"
                      + "Tên: *" + senderName + "* \n"
                      + "Số tài nhận: *" + senderNumber + "* \n"
                      + "Tên ngân hàng: *" + bankName + "* \n"
                      + "Số tiên: *" + this.vndFormatPipe.transform(this.formWithDrawal.get('amount').value) + "* \n"
                      + "Game: *" + gameName['name'] + "* \n"
                  }
                  this.connectApi.post('v1/telegram', meessage).subscribe((response: any) => {
                    console.log(response)
                  })
                })
                this.getTransaction()
              }
            }).catch((error: any) => {
              console.log(error);
            });
          }
        });
      }
    }).catch((error: any) => {
      console.log(error);
    });

  }
  checkInit() {
    this.isLoggedIn = !!this.sessionStore.getToken();
    this.cookieStore.getCookie("auth-token");
    //console.log(this.cookieStore.getCookie("auth-token"))
    const token = this.sessionStore.getToken();
    if (token) {
      const payload = decode(token);
      //console.log(payload)
      if (this.isLoggedIn) {
        const user = this.sessionStore.getUser();
        this.username = user["username"];
        this.userId = user["_id"];
      }
    }
  }

  changePass() {
    var obj = {
      _id: this.userId,
      oldPassword: this.formChangePass.get('oldPass').value,
      newPassword: this.formChangePass.get('password').value,
    }
    this.connectApi.post('v1/user/changepass', obj).subscribe((response: any) => {
      const modalRef = this.modalService.open(MyModalComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.Notification = 'Đổi mật khẩu';
      modalRef.componentInstance.contentNotification =
        ' Bạn đã đổi mật khẩu thành công. Xin vui lòng đăng nhập lại';
      modalRef.result
        .then((result: any) => {
          this.sessionStore.signOut();
          this.dataShare.setToken('');
          this.dataShare.setDataUser(null);
          window.location.href = '/';
        })
        .catch((error: any) => {
          console.log(error);
        });
    }, (reponse) => {
      const modalRef = this.modalService.open(MyModalComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.Notification = 'Đổi mật khẩu';
      modalRef.componentInstance.contentNotification =
        ' Bạn đã đổi mật khẩu không thành công.';
      modalRef.result
        .then((result: any) => {
        })
        .catch((error: any) => {
          console.log(error);
        });
    })
  }

  @ViewChild('myInputpass', { static: false }) myInputpass: ElementRef | undefined;
  @ViewChild('myInputaccount', { static: false }) myInputaccount: NgSelectComponent | undefined;


  copyToClipboardAccount() {
    if (this.myInputaccount) {
      var selectedValue: any
      selectedValue = this.myInputaccount.selectedItems[0].label;
      const textarea = document.createElement('textarea');
      textarea.value = selectedValue;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }
  copyToClipboardPass() {
    if (this.myInputpass) {
      console.log(this.myInputpass)
      this.myInputpass.nativeElement.select();
      document.execCommand('copy');
    }
  }

  updateAccount(account: any) {
    const modalRef = this.modalService.open(MyModalupdateaccountBankuserComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "1";
    modalRef.componentInstance.infoBank = account;
    modalRef.componentInstance.Tittle = "Chỉnh sửa thông tin tài khoản";
    modalRef.componentInstance.buttonConfirm = "Cập Nhập";
    modalRef.result.then((result: any) => {
      if (result == true) {
        console.log(result)

        // const queryParams = { tab: 1 };
        // this.route.navigate(['/account-info'], { queryParams });
        this.ngOnInit()
        this.selectedTab = 1
      }
      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }

}
