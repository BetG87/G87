import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModaldeleteComponent } from '../my-modaldelete/my-modaldelete.component';

@Component({
  selector: 'app-my-modalupdateaccount-game',
  templateUrl: './my-modalupdateaccount-game.component.html',
  styleUrls: ['./my-modalupdateaccount-game.component.scss']
})
export class MyModalupdateaccountGameComponent implements OnInit {
  public formAccountupdateGame: FormGroup | any
  infoGame: any | undefined;
  isDisabled: boolean = true;


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
      passAccountGame: [''],
      password: ['']

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    console.log(this.infoGame)

    if (this.infoGame) {
      console.log(this.infoGame)
      this.formAccountupdateGame.controls['nameGame'].setValue(this.infoGame.nameGame !== undefined ? this.infoGame.nameGame : "");
      this.formAccountupdateGame.controls['nameAccountGame'].setValue(this.infoGame.username !== undefined ? this.infoGame.username : "");
      this.formAccountupdateGame.controls['user'].setValue(this.infoGame.user !== undefined ? this.infoGame.user : "");
      this.formAccountupdateGame.controls['statusAccount'].setValue(this.infoGame.isActive !== undefined ? this.infoGame.isActive : "");
      this.formAccountupdateGame.controls['password'].setValue("");
      console.log(this.infoGame)
    }


  }

  closeModal() {
    this.activeModal.close(false);
  }




  confirm() {
    {
      const title = "Cập Nhập tài khoản Game";
      const content = "Bạn có chắc muốn cập nhập tài khoản Game này?";
      const modalRef = this.modalService.open(MyModaldeleteComponent, { size: "md", backdrop: "static", keyboard: false });
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
            this.activeModal.close(true);
          })
        } else
          console.log(result);
      }).catch((error: any) => {
        console.log(error);
      });
    }

  }

}
