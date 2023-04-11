import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalComponent } from '../my-modal/my-modal.component';

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

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formAccountupdate = this.fb.group({
      // id: [''],
      nameAccount: [''],
      numberPhone: [''],
      typeAccount: [''],
      fullname: [''],
      email: [''],
      passWord: [''],
      statusUser: [''],
      bankId: [''],
      bankAccountNumber: ['']
    });
    
  }

  ngOnInit(): void {
    this.connectApi.get('v1/bank').subscribe((response) => {
      console.log(response)
      this.bankNameLists = response;
    });
    this.Getdata()
  }

  Getdata() {
    if (this.mode == "1") {
      console.log(this.info[0])
      if (this.info[0]) {
        // this.formAccountupdate.controls['id'].setValue(this.info[0]._id !== undefined ? this.info[0]._id : "");
        this.formAccountupdate.controls['nameAccount'].setValue(this.info[0].username !== undefined ? this.info[0].username : "");
        this.formAccountupdate.controls['numberPhone'].setValue(this.info[0].numberPhone !== undefined ? this.info[0].numberPhone : "");
        this.formAccountupdate.controls['typeAccount'].setValue(this.info[0].admin !== undefined ? this.info[0].admin : "");
        this.formAccountupdate.controls['fullname'].setValue(this.info[0].fullName !== undefined ? this.info[0].fullName : "");
        this.formAccountupdate.controls['email'].setValue(this.info[0].email !== undefined ? this.info[0].email : "");
        this.formAccountupdate.controls['statusUser'].setValue(this.info[0].isActive !== undefined ? this.info[0].isActive : false);
        this.formAccountupdate.get('nameAccount').disable();
      }
    }
  }

  public onSubmit(): void {

  }

  closeModal() {
    this.activeModal.close(true);
  }
  confirm() {
    if (!this.checkForm()) {
      alert("Xin hãy nhập đầy đủ nội dung");
      return
    }
    if (this.mode == "1") {
      const title = "Cập Nhập Thông Tin Tài Khoản";
      const content = "Bạn có chắc muốn cập nhập thông tin tài khoản này?";
      const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.content = content;
      modalRef.result.then((result: any) => {
        if (result == true) {
          const meessage = {
            "_id": this.info[0]._id,
            "username": this.formAccountupdate.controls['nameAccount'].value,
            "email": this.formAccountupdate.controls['email'].value,
            "password": this.formAccountupdate.controls['passWord'].value,
            "numberPhone": this.formAccountupdate.controls['numberPhone'].value,
            "fullName": this.formAccountupdate.controls['fullname'].value,
            "admin": this.formAccountupdate.controls['typeAccount'].value,
            "isActive": this.formAccountupdate.controls['statusUser'].value
          }
          console.log(meessage)
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
                  console.log(error);
                });
            }
          })
        }
        console.log(result);
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      const title = "Tạo Mới Tài Khoản";
      const content = "Bạn có muốn tạo mới tài khoản này?";
      const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.content = content;
      modalRef.result.then((result: any) => {
        if (result == true) {
          const meessage = {
            "username": this.formAccountupdate.controls['nameAccount'].value,
            "email": this.formAccountupdate.controls['email'].value,
            "password": this.formAccountupdate.controls['passWord'].value,
            "numberPhone": this.formAccountupdate.controls['numberPhone'].value,
            "fullName": this.formAccountupdate.controls['fullname'].value,
            "admin": this.formAccountupdate.controls['typeAccount'].value,
            "isActive": this.formAccountupdate.controls['statusUser'].value,
            "bankId": this.formAccountupdate.controls['bankId'].value,
            "bankAccountNumber": this.formAccountupdate.controls['bankAccountNumber'].value,
          }
          console.log(meessage)
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
    const controls = this.formAccountupdate.controls;
    for (const name in controls) {
      if (controls[name].value === '') {
        formValid = false;
        break;
      }
    }
    return formValid;
  }

}