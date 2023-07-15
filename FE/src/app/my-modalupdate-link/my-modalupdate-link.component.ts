import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-my-modalupdate-link',
  templateUrl: './my-modalupdate-link.component.html',
  styleUrls: ['./my-modalupdate-link.component.scss']
})
export class MyModalupdateLinkComponent  implements OnInit {
  public formupdateLinkGame: FormGroup | any
  infoLinkGame: any | undefined;
  allAccount: any;
  mode: string = "0";
  allGameproduct: any;
  TittleGame: string = "";
  buttonConfirm: string = "";
  confirm: boolean = false;

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formupdateLinkGame = this.fb.group({
      nameGame: [null, [Validators.required]],
      linkGame: [null, [Validators.required]],
      statusGame: [true],

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    if (this.mode == "1") {
      if (this.infoLinkGame) {
        this.formupdateLinkGame.controls['nameGame'].setValue(this.infoLinkGame.name !== undefined ? this.infoLinkGame.name : "");
        this.formupdateLinkGame.controls['linkGame'].setValue(this.infoLinkGame.linkGame !== undefined ? this.infoLinkGame.linkGame : "");
        this.formupdateLinkGame.controls['statusGame'].setValue(this.infoLinkGame.isActive !== undefined ? this.infoLinkGame.isActive : true);
      }
    }
  }

  closeModal() {
    this.activeModal.close(false);
  }
  btnconfirm() {
    this.confirm = true

    if (this.confirm && this.formupdateLinkGame.valid) {
      if (this.mode == "1") {
        this.fnupdateAccount()
      } else {
        this.fncreateAccount()
      }
    }
  }


  fnupdateAccount() {
    const title = "Cập Nhập Đường Dẫn Game";
    const content = "Bạn có chắc muốn cập nhập Đường Dẫn Game này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": this.infoLinkGame._id,
          "name": this.formupdateLinkGame.controls['nameGame'].value,
          "linkGame": this.formupdateLinkGame.controls['linkGame'].value,
          "isActive": this.formupdateLinkGame.controls['statusGame'].value
        }
        this.connectApi.post('v1/linkgame/update', meessage).subscribe((response: any) => {
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
                'Cập nhập Game thành công';
              modalRef.componentInstance.command = "updategame";
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
    const title = "Tạo Đường Dẫn Game";
    const content = "Bạn có muốn tạo Đường Dẫn Game này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "name": this.formupdateLinkGame.controls['nameGame'].value,
          "linkGame": this.formupdateLinkGame.controls['linkGame'].value,
          "isActive": this.formupdateLinkGame.controls['statusGame'].value
        }
        this.connectApi.post('v1/linkgame/', meessage).subscribe((response: any) => {
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Tạo Mới';
            modalRef.componentInstance.contentNotification =
              'Tạo mới Đường Dẫn Game thành công';
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

