import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-my-modalinfoaccount-game',
  templateUrl: './my-modalinfoaccount-game.component.html',
  styleUrls: ['./my-modalinfoaccount-game.component.scss']
})
export class MyModalinfoaccountGameComponent implements OnInit {
  public formAccountinfoGame: FormGroup | any
  infoGame: any | undefined;
  isDisabled: boolean = true;

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,) {
    this.formAccountinfoGame = this.fb.group({
      accountGame: [''],
      nameAccountGame: [''],
      userGame: [''],
      statusAccount: [''],

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    console.log(this.infoGame)

    if (this.infoGame) {
      console.log(this.infoGame)
      this.formAccountinfoGame.controls['accountGame'].setValue(this.infoGame.gameProduct !== undefined ? this.infoGame.gameProduct : "");
      this.formAccountinfoGame.controls['nameAccountGame'].setValue(this.infoGame.username !== undefined ? this.infoGame.username : "");
      this.formAccountinfoGame.controls['userGame'].setValue(this.infoGame.user !== undefined ? this.infoGame.user : "");
      this.formAccountinfoGame.controls['statusAccount'].setValue(this.infoGame.isActive !== undefined ? this.infoGame.isActive : "");
      console.log(this.infoGame)
    }


  }

  closeModal() {
    this.activeModal.close(true);
  }
  confirm() {
    this.activeModal.close(false);
  }

}
