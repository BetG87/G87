import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { GameProduct } from '../entity/GameProduct';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-my-modalupdate-bank',
  templateUrl: './my-modalupdate-bank.component.html',
  styleUrls: ['./my-modalupdate-bank.component.scss']
})
export class MyModalupdateBankComponent implements OnInit {
  public formBank: FormGroup | any
  infoBank: any | undefined;
  confirm: boolean = false;
  Tittle: string = "";
  buttonConfirm: string = "";
  mode: string = "0";

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formBank = this.fb.group({
      codeBank: [null, [Validators.required]],
      nameBank: [null, [Validators.required]],
      statusBank: [true],
    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {

    if (this.mode == "1") {
      if (this.infoBank) {
        this.formBank.controls['codeBank'].setValue(this.infoBank.code !== undefined ? this.infoBank.code : "");
        this.formBank.controls['nameBank'].setValue(this.infoBank.name !== undefined ? this.infoBank.name : "");
        this.formBank.controls['statusBank'].setValue(this.infoBank.isActive !== undefined ? this.infoBank.isActive : false);
      }
    }
  }
  closeModal() {
    this.activeModal.close(false);
  }

  btnconfirm() {
    this.confirm = true

    if (this.confirm && this.formBank.valid) {
      if (this.mode == "1") {
        this.fnupdateAccount()
      } else {
        this.fncreateAccount()
      }
    }
  }

  fnupdateAccount() {
    const title = "Cập Nhập ngân hàng";
    const content = "Bạn có chắc muốn cập nhập ngân hàng ?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": this.infoBank._id,
          "code": this.formBank.controls['codeBank'].value,
          "name": this.formBank.controls['nameBank'].value,
          "isActive": this.formBank.controls['statusBank'].value
        }
        this.connectApi.post('v1/bank/update', meessage).subscribe((response: any) => {
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
                'Cập nhập ngân hàng thành công';
              modalRef.componentInstance.command = "updateBank";
              modalRef.result
                .then((result: any) => {
                  this.activeModal.close(true);
                })
                .catch((error: any) => {
                });
            }
          }
        })
      } 
    }).catch((error: any) => {
    });
  }

  fncreateAccount() {
    const title = "Tạo tài khoản ngân hàng";
    const content = "Bạn có muốn thêm mới ngân hàng này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "code": this.formBank.controls['codeBank'].value,
          "name": this.formBank.controls['nameBank'].value,
          "isActive": this.formBank.controls['statusBank'].value
        }
        this.connectApi.post('v1/bank/', meessage).subscribe((response: any) => {
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Tạo Mới';
            modalRef.componentInstance.contentNotification =
              'Tạo mới ngân hàng thành công';
            modalRef.result
              .then((result: any) => {
                this.activeModal.close(true);
              })
              .catch((error: any) => {
              });
          }
        })
      } 
    }).catch((error: any) => {
    });
  }
}
