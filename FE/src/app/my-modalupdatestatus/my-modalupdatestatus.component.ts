import { Component } from '@angular/core';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-my-modalupdatestatus',
  templateUrl: './my-modalupdatestatus.component.html',
  styleUrls: ['./my-modalupdatestatus.component.scss']
})
export class MyModalupdatestatusComponent {
  public formStatus: FormGroup | any
  infoStatus: any | undefined;
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
    this.formStatus = this.fb.group({
      name: [null, [Validators.required]],
      isActive: [null, [Validators.required]]
    });

  }


  public onSubmit(): void {

  }
  ngOnInit(): void {
    if (this.mode == "1") {
      this.GetData()
    }

  }
  GetData() {
    if (this.infoStatus) {
      console.log(this.infoStatus)
      this.formStatus.controls['isActive'].setValue(this.infoStatus.isActive !== undefined ? this.infoStatus.isActive : true);
      this.formStatus.controls['name'].setValue(this.infoStatus.name !== undefined ? this.infoStatus.name : "");
      console.log(this.infoStatus)
    }
  }
  closeModal() {
    this.activeModal.close(true);
  }
  // confirm() {
  //   this.formAccountinfoStatus.controls['userBank'].setValue(this.infoStatus.user !== undefined ? this.infoStatus.user._id : "");
  //   this.activeModal.close(false);
  // }
  btnconfirm() {
    this.confirm = true
    if (this.confirm && this.formStatus.valid) {
      if (this.mode == "1") {
        this.fnupdateAccountBank()
      } else {
        this.fncreateAccountBank()
      }
    }
  }
  fnupdateAccountBank() {
    const title = "Cập Nhập Trạng thái";
    const content = "Bạn có chắc muốn cập nhập Trạng thái này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id":this.infoStatus['_id'],
          "name": this.formStatus.controls['name'].value,
          "isActive": this.formStatus.controls['isActive'].value
        }
        console.log(meessage)
        this.connectApi.post('v1/status/update', meessage).subscribe((response: any) => {
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
                'Cập nhập Trạng thái thành công';
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
    const title = "Trạng thái";
    const content = "Bạn có muốn tạo Trạng thái này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "name": this.formStatus.controls['name'].value,
        }
        console.log(meessage)
        this.connectApi.post('v1/status/', meessage).subscribe((response: any) => {
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Tạo Mới';
            modalRef.componentInstance.contentNotification =
              'Tạo Trạng thái thành công';
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
