import { Component } from '@angular/core';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-my-modalupdateanotification',
  templateUrl: './my-modalupdateanotification.component.html',
  styleUrls: ['./my-modalupdateanotification.component.scss']
})
export class MyModalupdateanotificationComponent {
  public formnotification: FormGroup | any
  infonotification: any | undefined;
  mode: string = "0";
  bankNameLists: any;
  allUserName: any[] = [];
  confirm: boolean = false;
  Tittle: string = "";
  buttonConfirm: string = "";

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formnotification = this.fb.group({
      content: [null, [Validators.required]],
      isActive: [true, [Validators.required]]
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
    if (this.infonotification) {
      this.formnotification.controls['isActive'].setValue(this.infonotification.isActive !== undefined ? this.infonotification.isActive : true);
      this.formnotification.controls['content'].setValue(this.infonotification.content !== undefined ? this.infonotification.content : "");
    }
  }
  closeModal() {
    this.activeModal.close(true);
  }
  btnconfirm() {
    this.confirm = true
    if (this.confirm && this.formnotification.valid) {
      if (this.mode == "1") {
        this.fnupdateAccountBank()
      } else {
        this.fncreateAccountBank()
      }
    }
  }
  fnupdateAccountBank() {
    const title = "Cập Nhập Thông Báo";
    const content = "Bạn có chắc muốn cập nhập Thông báo này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": this.infonotification['_id'],
          "content": this.formnotification.controls['content'].value,
          "isActive": this.formnotification.controls['isActive'].value
        }
        this.connectApi.post('v1/notification/update', meessage).subscribe((response: any) => {
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
                'Cập nhập Thông báo thành công';
              modalRef.componentInstance.command = "updatenotiflcation";
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
  fncreateAccountBank() {
    const title = "Thông Báo";
    const content = "Bạn có muốn thêm mới thông báo này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "content": this.formnotification.controls['content'].value,
        }
        this.connectApi.post('v1/notification', meessage).subscribe((response: any) => {
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Tạo Mới';
            modalRef.componentInstance.contentNotification =
              'Tạo mới thông báo thành công';
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

