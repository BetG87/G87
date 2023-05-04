import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-my-modalupdateaccount-bankuser',
  templateUrl: './my-modalupdateaccount-bankuser.component.html',
  styleUrls: ['./my-modalupdateaccount-bankuser.component.scss']
})
export class MyModalupdateaccountBankuserComponent implements OnInit {
  public formAccountinfoBank: FormGroup | any
  infoBank: any | undefined;
  bankNameLists: any;
  confirm: boolean = false;
  Tittle: string = "";
  buttonConfirm :string = "";

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formAccountinfoBank = this.fb.group({
      nameAccount: [null, [Validators.required]],
      numberBank: [null, [Validators.required]],
      nameBank: [''],
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
      this.formAccountinfoBank.controls['nameBank'].setValue(this.bankNameLists[0]?._id)
      this.GetData()
    });
  }
  GetData() {
    if (this.infoBank) {
      console.log(this.infoBank)
      this.formAccountinfoBank.controls['nameAccount'].setValue(this.infoBank.nameAccount !== undefined ? this.infoBank.nameAccount : "");
      this.formAccountinfoBank.controls['numberBank'].setValue(this.infoBank.numberBank !== undefined ? this.infoBank.numberBank : "");
      const info = this.bankNameLists.filter((item: { name: any; }) => item.name === this.infoBank.nameBank);
      console.log(info)
      this.formAccountinfoBank.controls['nameBank'].setValue(info[0]._id !== undefined ? info[0]._id : "");
      console.log(this.infoBank)
    }
  }
  closeModal() {
    this.activeModal.close(true);
  }
  btnconfirm() {
    this.confirm = true
    if (this.confirm && this.formAccountinfoBank.valid) {
        this.fnupdateAccountBank()   
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
          "ownerName": this.formAccountinfoBank.controls['nameAccount'].value,
          "bankId": this.formAccountinfoBank.controls['nameBank'].value,
          "bankAccountNumber": this.formAccountinfoBank.controls['numberBank'].value,
        }
        console.log(meessage)
        this.connectApi.post('v1/bankaccount/update', meessage).subscribe((response: any) => {
          console.log(response)
          if (response === "Update successfully") {       
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
        })
      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  

}
