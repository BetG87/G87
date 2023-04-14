import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-my-modalupdatetransactions',
  templateUrl: './my-modalupdatetransactions.component.html',
  styleUrls: ['./my-modalupdatetransactions.component.scss']
})
export class MyModalupdatetransactionsComponent implements OnInit {
  public formAccountupdateTransaction: FormGroup | any
  allUserName: any[] = [];
  allBankAccount: any[] = [];
  allBank: any[] = [];
  listallBankAccount: any[] = [];
  listStatus: any[] = [];
  listallStatus: any[] = [];
  infoTransactions: any | undefined;
  mode: string = "0";
  allGameproduct: any;
  Tittle: string = "";
  buttonConfirm: string = "";

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formAccountupdateTransaction = this.fb.group({
      UserName: [''],
      nameGame: [''],
      AccountBankUser: [''],
      AccountBankAdmin: [''],
      amount: [''],
      status: [''],
      type: [''],
      note: [''],
    });

  }
  public onSubmit(): void {

  }
  async ngOnInit(): Promise<void> {
    await this.GetUser();
    await this.GetProduct();
    await this.GetBankAccount();
    await this.GetStatus();

  }
  GetUser() {
    this.connectApi.get('v1/user').subscribe((response: any) => {
      this.allUserName = response
      console.log(this.allUserName)
    })
    return Promise.resolve();
  }
  GetProduct() {
    this.connectApi.get('v1/gameproduct').subscribe((response: any) => {
      this.allGameproduct = response
      console.log(this.allGameproduct)
    })
    return Promise.resolve();
  }
  GetBankAccount() {
    this.connectApi.get('v1/bank').subscribe((response: any) => {
      this.allBank = response
      this.connectApi.get('v1/bankaccount').subscribe((response: any) => {
        console.log(response)
        this.allBankAccount = response
        this.listallBankAccount = [...this.allBankAccount];
        console.log(this.listallBankAccount)
        for (let i = 0; i < this.listallBankAccount.length; i++) {
          const bankId = this.listallBankAccount[i].bankId;
          const bankAccount = this.allBank.find(g => g._id === bankId);
          if (bankAccount) {
            this.listallBankAccount[i].namebank = bankAccount.name;
            this.listallBankAccount[i].fullNameBank = this.listallBankAccount[i].ownerName + "-" + bankAccount.name + "-" + this.listallBankAccount[i].bankAccountNumber;
          }
        }
        console.log(this.listallBankAccount)
        return Promise.resolve();
      })
    })
    return Promise.resolve();
  }

  GetStatus() {
    this.connectApi.get('v1/status').subscribe((response: any) => {
      console.log(response)
      this.listStatus = response
      this.listallStatus = [...this.listStatus];
      console.log(this.listallStatus)
    })
    this.GetData();
    return Promise.resolve();
  }

  GetData() {
    if (this.mode == "1") {
      console.log(this.infoTransactions)
      if (this.infoTransactions) {
        console.log(this.infoTransactions)
        this.formAccountupdateTransaction.controls['UserName'].setValue(this.infoTransactions.user?._id !== undefined ? this.infoTransactions.user?._id : "");
        this.formAccountupdateTransaction.controls['nameGame'].setValue(this.infoTransactions.gameProduct?._id !== undefined ? this.infoTransactions.gameProduct?._id : "");
        this.formAccountupdateTransaction.controls['AccountBankUser'].setValue(this.infoTransactions.bankAccount?._id !== undefined ? this.infoTransactions.bankAccount?._id : "");
        this.formAccountupdateTransaction.controls['AccountBankAdmin'].setValue(this.infoTransactions.bankAccountAdmin?._id !== undefined ? this.infoTransactions.bankAccountAdmin?._id : "");
        this.formAccountupdateTransaction.controls['amount'].setValue(this.infoTransactions.amount !== undefined ? this.infoTransactions.amount : "");
        this.formAccountupdateTransaction.controls['status'].setValue(this.infoTransactions.status?._id !== undefined ? this.infoTransactions.status?._id : "");
        this.formAccountupdateTransaction.controls['type'].setValue(this.infoTransactions.type !== undefined ? this.infoTransactions.type : "");
        this.formAccountupdateTransaction.controls['note'].setValue(this.infoTransactions.note !== undefined ? this.infoTransactions.note : "");
        
        this.formAccountupdateTransaction.get('UserName').disable();
        this.formAccountupdateTransaction.get('nameGame').disable();
        this.formAccountupdateTransaction.get('AccountBankUser').disable();
        this.formAccountupdateTransaction.get('AccountBankAdmin').disable();
        this.formAccountupdateTransaction.get('amount').disable();

        // this.formAccountupdateTransaction.get('nameAccountGame').disable();
        console.log(this.infoTransactions.numberbankAccount)
        console.log(this.formAccountupdateTransaction.controls['AccountBankUser'].value)
        console.log(this.listallBankAccount)
      }
    }
    return Promise.resolve();
  }

  closeModal() {
    this.activeModal.close(false);
  }


  confirm() {
    if (!this.checkForm()) {
      alert("Xin hãy nhập đầy đủ nội dung");
      return
    }
    if (this.mode == "1") {
      const title = "Cập Nhập Giao Dịch";
      const content = "Bạn có chắc muốn cập nhập giao dịch này?";
      const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.content = content;
      modalRef.result.then((result: any) => {
        if (result == true) {
          const meessage = {
            "_id": this.infoTransactions._id,
            "amount": this.formAccountupdateTransaction.controls['amount'].value,
            "type": this.formAccountupdateTransaction.controls['type'].value,
            "bankAccount": this.formAccountupdateTransaction.controls['AccountBankUser'].value,
            "bankAccountAdmin": this.formAccountupdateTransaction.controls['AccountBankAdmin'].value,
            "gameProduct": this.formAccountupdateTransaction.controls['nameGame'].value,
            "status": this.formAccountupdateTransaction.controls['status'].value,
            "user": this.formAccountupdateTransaction.controls['UserName'].value,
            "note": this.formAccountupdateTransaction.controls['note'].value
          }
          console.log(meessage)
          this.connectApi.post('v1/transaction/update', meessage).subscribe((response: any) => {
            this.activeModal.close(true);
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Cập Nhập';
            modalRef.componentInstance.contentNotification =
              'Cập nhập giao dịch thành công';
            modalRef.result
              .then((result: any) => {
              })
              .catch((error: any) => {
                console.log(error);
              });
          })
        } else
          console.log(result);
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      const title = "Tạo Mới Giao Dịch";
      const content = "Bạn có muốn tạo mới giao dịch này?";
      const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.content = content;
      modalRef.result.then((result: any) => {
        if (result == true) {
          const meessage = {
            "amount": this.formAccountupdateTransaction.controls['amount'].value,
            "type": this.formAccountupdateTransaction.controls['type'].value,
            "bankAccount": this.formAccountupdateTransaction.controls['AccountBankUser'].value,
            "bankAccountAdmin": this.formAccountupdateTransaction.controls['AccountBankAdmin'].value,
            "gameProduct": this.formAccountupdateTransaction.controls['nameGame'].value,
            "status": this.formAccountupdateTransaction.controls['status'].value,
            "user": this.formAccountupdateTransaction.controls['UserName'].value,
            "note": this.formAccountupdateTransaction.controls['note'].value
          }
          console.log(meessage)
          this.connectApi.post('v1/transaction/', meessage).subscribe((response: any) => {
            this.activeModal.close(true);
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Đăng kí';
            modalRef.componentInstance.contentNotification =
              'Đăng kí giao dịch thành công';
            modalRef.result
              .then((result: any) => {
              })
              .catch((error: any) => {
                console.log(error);
              });
          })
        } else
          console.log(result);
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  checkForm() {
    let formValid = true;
    const controls = this.formAccountupdateTransaction.controls;
    for (const name in controls) {
      if (controls[name].value === '') {
        formValid = false;
        break;
      }
    }
    return formValid;
  }



}
