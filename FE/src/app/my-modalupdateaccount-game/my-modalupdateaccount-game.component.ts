import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-my-modalupdateaccount-game',
  templateUrl: './my-modalupdateaccount-game.component.html',
  styleUrls: ['./my-modalupdateaccount-game.component.scss']
})
export class MyModalupdateaccountGameComponent implements OnInit {
  public formAccountupdateGame: FormGroup | any
  infoGame: any | undefined;
  allAccount: any;
  mode: string = "0";
  allGameproduct: any;
  TittleGame: string = "";
  buttonConfirm: string = "";

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formAccountupdateGame = this.fb.group({
      nameGame: [''],
      nameAccountGame: [''],
      user: [''],
      statusAccount: [''],
      password: ['']

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    this.connectApi.get('v1/user').subscribe((response: any) => {
      this.allAccount = response
      console.log(this.allAccount)
    })

    this.connectApi.get('v1/gameproduct').subscribe((response: any) => {
      this.allGameproduct = response
      console.log(this.allGameproduct)
    })
    if (this.mode == "1") {
      console.log(this.infoGame)
      if (this.infoGame) {
        console.log(this.infoGame)
        this.formAccountupdateGame.controls['nameGame'].setValue(this.infoGame.gameProduct !== undefined ? this.infoGame.gameProduct : "");
        this.formAccountupdateGame.controls['nameAccountGame'].setValue(this.infoGame.username !== undefined ? this.infoGame.username : "");
        this.formAccountupdateGame.controls['user'].setValue(this.infoGame.user !== undefined ? this.infoGame.user : "");
        this.formAccountupdateGame.controls['statusAccount'].setValue(this.infoGame.isActive !== undefined ? this.infoGame.isActive : "");
        this.formAccountupdateGame.controls['password'].setValue("");
        this.formAccountupdateGame.get('nameGame').disable();
        this.formAccountupdateGame.get('nameAccountGame').disable();
        console.log(this.infoGame)
      }
    }
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
      const title = "Cập Nhập tài khoản Game";
      const content = "Bạn có chắc muốn cập nhập tài khoản Game này?";
      const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.content = content;
      modalRef.result.then((result: any) => {
        if (result == true) {
          const meessage = {
            "_id": this.infoGame._id,
            "username": this.formAccountupdateGame.controls['nameAccountGame'].value,
            "password": this.formAccountupdateGame.controls['password'].value,
            "isActive": this.formAccountupdateGame.controls['statusAccount'].value,
            "gameProduct": this.infoGame.gameProduct,
            "user": this.formAccountupdateGame.controls['user'].value
          }
          console.log(meessage)
          this.connectApi.post('v1/gameaccount/update', meessage).subscribe((response: any) => {
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
                  'Cập nhập tài khoản Game thành công';
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
    } else {
      const title = "Tạo tài khoản Game";
      const content = "Bạn có muốn tạo tài khoản Game này?";
      const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.content = content;
      modalRef.result.then((result: any) => {
        if (result == true) {
          const meessage = {
            // "_id": this.infoGame._id,
            "username": this.formAccountupdateGame.controls['nameAccountGame'].value,
            "password": this.formAccountupdateGame.controls['password'].value,
            "isActive": this.formAccountupdateGame.controls['statusAccount'].value,
            "gameProduct": this.formAccountupdateGame.controls['nameGame'].value,
            "user": this.formAccountupdateGame.controls['user'].value
          }
          console.log(meessage)
          this.connectApi.post('v1/gameaccount/', meessage).subscribe((response: any) => {
            if (response) {
              const modalRef = this.modalService.open(MyModalComponent, {
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
              });
              modalRef.componentInstance.Notification =
                'Thông Báo Tạo Mới';
              modalRef.componentInstance.contentNotification =
                'Tạo mới tài khoản Game thành công';
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

  checkForm() {
    let formValid = true;
    const controls = this.formAccountupdateGame.controls;
    for (const name in controls) {
      if (controls[name].value === '') {
        formValid = false;
        break;
      }
    }
    return formValid;
  }



}
