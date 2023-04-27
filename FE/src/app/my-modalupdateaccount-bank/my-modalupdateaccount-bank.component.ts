import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-my-modalupdateaccount-bank',
  templateUrl: './my-modalupdateaccount-bank.component.html',
  styleUrls: ['./my-modalupdateaccount-bank.component.scss']
})
export class MyModalupdateaccountBankComponent implements OnInit {
  public formAccountinfoBank: FormGroup | any
  infoBank: any | undefined;
  mode: string = "0";
  bankNameLists: any;
  allUserName: any[] = [];
  confirm: boolean = false;
  Tittle: string = "";
  buttonConfirm :string = "";

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formAccountinfoBank = this.fb.group({
      userName: [null, [Validators.required]],
      accountBank: [null, [Validators.required]],
      nameAccountBank: [null, [Validators.required]],
      statusAccount: [true],
      typeAccount: [true],
      bankId: [''],
    });

  }


  public onSubmit(): void {

  }
  ngOnInit(): void {

    this.GetBank()

    console.log(this.infoBank)



  }
  GetBank() {
    this.connectApi.get('v1/bank').subscribe((response) => {
      console.log(response)
      this.bankNameLists = response;
      this.formAccountinfoBank.controls['bankId'].setValue(this.bankNameLists[0]?._id)
      this.GetUser()
    });
  }
  GetUser() {
    this.connectApi.get('v1/user').subscribe((response: any) => {
      this.allUserName = response
      console.log(this.allUserName)
      if (this.mode == "1") {
        this.GetData()
      }
    })
  }
  GetData() {
    if (this.infoBank) {
      console.log(this.infoBank)
      this.formAccountinfoBank.controls['userName'].setValue(this.infoBank.user?._id !== undefined ? this.infoBank.user?._id : "");
      this.formAccountinfoBank.controls['accountBank'].setValue(this.infoBank.bankAccountNumber !== undefined ? this.infoBank.bankAccountNumber : "");
      this.formAccountinfoBank.controls['nameAccountBank'].setValue(this.infoBank.ownerName !== undefined ? this.infoBank.ownerName : "");
      this.formAccountinfoBank.controls['statusAccount'].setValue(this.infoBank.isActive !== undefined ? this.infoBank.isActive : "");
      this.formAccountinfoBank.controls['typeAccount'].setValue(this.infoBank.isAdmin !== undefined ? this.infoBank.isAdmin : true);
      this.formAccountinfoBank.controls['bankId'].setValue(this.infoBank.bankId !== undefined ? this.infoBank.bankId : "");
      this.formAccountinfoBank.get('userName').disable();
      console.log(this.infoBank)
    }
  }
  closeModal() {
    this.activeModal.close(true);
  }
  // confirm() {
  //   this.formAccountinfoBank.controls['userBank'].setValue(this.infoBank.user !== undefined ? this.infoBank.user._id : "");
  //   this.activeModal.close(false);
  // }
  btnconfirm() {
    this.confirm = true
    if (this.confirm && this.formAccountinfoBank.valid) {
      if (this.mode == "1") {
        this.fnupdateAccountBank()
      } else {
        this.fncreateAccountBank()
      }
    }
  }
  fnupdateAccountBank() {
    const title = "Cập Nhập tài khoản ngân hàng";
    const content = "Bạn có chắc muốn cập nhập tài khoản ngân hàng này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": this.infoBank._id,
          "user": this.formAccountinfoBank.controls['userName'].value,
          "bankAccountNumber": this.formAccountinfoBank.controls['accountBank'].value,
          "ownerName": this.formAccountinfoBank.controls['nameAccountBank'].value,
          "isActive": this.formAccountinfoBank.controls['statusAccount'].value,
          "isAdmin": this.formAccountinfoBank.controls['typeAccount'].value,
          "bankId": this.formAccountinfoBank.controls['bankId'].value,

        }
        console.log(meessage)
        this.connectApi.post('v1/bankaccount/update', meessage).subscribe((response: any) => {
          if (response) {
            if (response) {
              const modalRef = this.modalService.open(MyModalComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
              });
              modalRef.componentInstance.Notification =
                'Thông Báo Cập Nhập';
              modalRef.componentInstance.contentNotification =
                'Cập nhập tài khoản ngân hàng thành công';
              modalRef.componentInstance.command = "updateBank";
              modalRef.result
                .then((result: any) => {
                  this.activeModal.close(true);
                })
                .catch((error: any) => {
                  console.log(error);
                });
            }
          }
        })
      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });

  }
  fncreateAccountBank() {
    const title = "Tạo tài khoản ngân hàng";
    const content = "Bạn có muốn tạo tài khoản ngân hàng này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "user": this.formAccountinfoBank.controls['userName'].value,
          "bankAccountNumber": this.formAccountinfoBank.controls['accountBank'].value,
          "ownerName": this.formAccountinfoBank.controls['nameAccountBank'].value,
          "isActive": this.formAccountinfoBank.controls['statusAccount'].value,
          "isAdmin": this.formAccountinfoBank.controls['typeAccount'].value,
          "bankId": this.formAccountinfoBank.controls['bankId'].value,
        }
        console.log(meessage)
        this.connectApi.post('v1/bankaccount/', meessage).subscribe((response: any) => {
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Tạo Mới';
            modalRef.componentInstance.contentNotification =
              'Tạo mới tài khoản ngân hàng thành công';
            modalRef.result
              .then((result: any) => {
                this.activeModal.close(true);
              })
              .catch((error: any) => {
                console.log(error);
              });
          }
        })
      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }

}

