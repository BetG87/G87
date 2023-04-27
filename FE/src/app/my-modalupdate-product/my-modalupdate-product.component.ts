import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-my-modalupdate-product',
  templateUrl: './my-modalupdate-product.component.html',
  styleUrls: ['./my-modalupdate-product.component.scss']
})
export class MyModalupdateProductComponent implements OnInit {
  public formupdateGame: FormGroup | any
  infoGame: any | undefined;
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
    this.formupdateGame = this.fb.group({
      nameGame: [null, [Validators.required]],
      linkImage: [null, [Validators.required]],
      linkGame: [null, [Validators.required]],
      statusGame: [true],

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    if (this.mode == "1") {
      console.log(this.infoGame)
      if (this.infoGame) {
        console.log(this.infoGame)
        this.formupdateGame.controls['nameGame'].setValue(this.infoGame.name !== undefined ? this.infoGame.name : "");
        this.formupdateGame.controls['linkImage'].setValue(this.infoGame.linkImage !== undefined ? this.infoGame.linkImage : "");
        this.formupdateGame.controls['linkGame'].setValue(this.infoGame.linkGame !== undefined ? this.infoGame.linkGame : "");
        this.formupdateGame.controls['statusGame'].setValue(this.infoGame.isActive !== undefined ? this.infoGame.isActive : true);
        this.formupdateGame.get('nameGame').disable();
        console.log(this.infoGame)
      }
    }
  }

  closeModal() {
    this.activeModal.close(false);
  }
  btnconfirm() {
    this.confirm = true

    if (this.confirm && this.formupdateGame.valid) {
      if (this.mode == "1") {
        this.fnupdateAccount()
      } else {
        this.fncreateAccount()
      }
    }
  }


  fnupdateAccount() {
    const title = "Cập Nhập Thông Tin Game";
    const content = "Bạn có chắc muốn cập nhập Game này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": this.infoGame._id,
          "name": this.formupdateGame.controls['nameGame'].value,
          "linkImage": this.formupdateGame.controls['linkImage'].value,
          "linkGame": this.formupdateGame.controls['linkGame'].value,
          "isActive": this.formupdateGame.controls['statusGame'].value
        }
        console.log(meessage)
        this.connectApi.post('v1/gameproduct/update', meessage).subscribe((response: any) => {
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

  fncreateAccount() {
    const title = "Tạo  Game";
    const content = "Bạn có muốn tạo  Game này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "name": this.formupdateGame.controls['nameGame'].value,
          "linkImage": this.formupdateGame.controls['linkImage'].value,
          "linkGame": this.formupdateGame.controls['linkGame'].value,
          "isActive": this.formupdateGame.controls['statusGame'].value
        }
        this.connectApi.post('v1/gameproduct/', meessage).subscribe((response: any) => {
          if (response) {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Tạo Mới';
            modalRef.componentInstance.contentNotification =
              'Tạo mới Game thành công';
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

