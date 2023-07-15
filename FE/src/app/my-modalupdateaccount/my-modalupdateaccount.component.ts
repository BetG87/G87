import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-modalupdateaccount',
  templateUrl: './my-modalupdateaccount.component.html',
  styleUrls: ['./my-modalupdateaccount.component.scss']
})
export class MyModalupdateaccountComponent implements OnInit {
  public formAccountupdate: FormGroup | any
  mode: string = "0";
  Tittle: string = "";
  buttonConfirm: string = "";
  info: any | undefined;
  bankNameLists: any;
  selectedBank: any;
  confirm: boolean = false

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {

  }

  ngOnInit(): void {
    if (this.mode == "0") {
      this.formAccountupdate = this.fb.group({
        nameAccount: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        numberPhone: [null, [Validators.required, Validators.minLength(8)]],
        typeAccount: [null, [Validators.required]],
        fullname: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
        statusUser: [true, [Validators.required]],
        accountpassword: [null, [Validators.required, Validators.minLength(6)]],
        bankId: [null, [Validators.required]],
        bankAccountNumber: [null, [Validators.required, Validators.minLength(8)]]
      });
    } else {
      this.formAccountupdate = this.fb.group({
        nameAccount: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        numberPhone: [null, [Validators.required, Validators.minLength(8)]],
        typeAccount: [null, [Validators.required]],
        fullname: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
        statusUser: [true, [Validators.required]],
        accountpassword: [null]
      });
    }
    if (this.mode == "0") {
      this.GetBank()
    } else {
      this.Getdata()
    }
  }

  GetBank() {
    this.connectApi.get('v1/bank').subscribe((response) => {
      this.bankNameLists = response;
      this.formAccountupdate.controls['bankId'].setValue(this.bankNameLists[0]?._id)
    });

  }

  Getdata() {
    if (this.mode == "1") {
      this.formAccountupdate.controls['nameAccount'].setValue(this.info[0].username !== undefined ? this.info[0].username : "");
      this.formAccountupdate.controls['numberPhone'].setValue(this.info[0].numberPhone !== undefined ? this.info[0].numberPhone : "");
      this.formAccountupdate.controls['typeAccount'].setValue(this.info[0].role !== undefined ? this.info[0].role : "");
      this.formAccountupdate.controls['fullname'].setValue(this.info[0].fullName !== undefined ? this.info[0].fullName : "");
      this.formAccountupdate.controls['statusUser'].setValue(this.info[0].isActive !== undefined ? this.info[0].isActive : false);
      this.formAccountupdate.controls['email'].setValue(this.info[0].email !== undefined ? this.info[0].email : "");
      this.formAccountupdate.get('nameAccount').disable();
    }
  }

  public onSubmit(): void {
  }
  closeModal() {
    this.activeModal.close(true);
  }
  btnconfirm() {
    this.confirm = true

    if (this.confirm && this.formAccountupdate.valid) {

      if (this.mode == "1") {
        this.fnupdateAccount()
      } else {
        const message = {
          "username": this.formAccountupdate.controls['nameAccount'].value
        }
        this.connectApi.post('v1/user/usernameisexist', message).subscribe((response) => {
          if (response['isexist']) {
            alert("Tài khoản này đã được sử dụng")
          } else {
            this.fncheckmail()
          }
        })
      }
    }
  }
  fncheckmail() {
    const message = {
      "email": this.formAccountupdate.controls['email'].value
    }
    this.connectApi.post('v1/user/emailisexist', message).subscribe((response: any) => {
      if (response['isexist']) {
        alert("Email này đã được sử dụng")
      } else {
        this.fncreateAccount()
      }
    })
  }

  fnupdateAccount() {

    const title = "Cập Nhập Thông Tin Tài Khoản";
    const content = "Bạn có chắc muốn cập nhập thông tin tài khoản này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        let meessage = {
          "_id": this.info[0]._id,
          "email": this.formAccountupdate.controls['email'].value,
          "password": this.formAccountupdate.controls['accountpassword'].value,
          "numberPhone": this.formAccountupdate.controls['numberPhone'].value,
          "fullName": this.formAccountupdate.controls['fullname'].value,
          "role": this.formAccountupdate.controls['typeAccount'].value,
          "isActive": this.formAccountupdate.controls['statusUser'].value
        }
        if (this.formAccountupdate.controls['accountpassword'].value == '' || this.formAccountupdate.controls['accountpassword'].value == null) {
          delete meessage['password'];
        }
        this.connectApi.post('v1/user/update', meessage).subscribe((response: any) => {
          if (response) {
            this.activeModal.close(true);
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Cập Nhập';
            modalRef.componentInstance.contentNotification =
              'Cập nhập tài khoản thành công';
            modalRef.result
              .then((result: any) => {
              })
              .catch((error: any) => {
              });
          }
        })
      }
    }).catch((error: any) => {
    });

  }
  fncreateAccount() {
    const title = "Đăng Kí Tài Khoản";
    const content = "Bạn có muốn đăng kí tài khoản này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "username": this.formAccountupdate.controls['nameAccount'].value,
          "email": this.formAccountupdate.controls['email'].value,
          "password": this.formAccountupdate.controls['accountpassword'].value,
          "numberPhone": this.formAccountupdate.controls['numberPhone'].value,
          "fullName": this.formAccountupdate.controls['fullname'].value,
          "role": this.formAccountupdate.controls['typeAccount'].value,
          "isActive": this.formAccountupdate.controls['statusUser'].value,
          "bankId": this.formAccountupdate.controls['bankId'].value,
          "bankAccountNumber": this.formAccountupdate.controls['bankAccountNumber'].value,
        }
        this.connectApi.post('v1/auth/register', meessage).subscribe((response: any) => {
          this.activeModal.close(true);
          const modalRef = this.modalService.open(MyModalComponent, {
            size: 'sm',
            backdrop: 'static',
            keyboard: false,
          });
          modalRef.componentInstance.Notification =
            'Thông Báo Đăng kí';
          modalRef.componentInstance.contentNotification =
            'Đăng kí tài khoản thành công';
          modalRef.result
            .then((result: any) => {
            })
            .catch((error: any) => {
            });
        })
      } 
    }).catch((error: any) => {
    });
  }

}
