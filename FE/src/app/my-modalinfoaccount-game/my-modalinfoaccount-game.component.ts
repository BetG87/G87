import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { GameProduct } from '../entity/GameProduct';

@Component({
  selector: 'app-my-modalinfoaccount-game',
  templateUrl: './my-modalinfoaccount-game.component.html',
  styleUrls: ['./my-modalinfoaccount-game.component.scss']
})
export class MyModalinfoaccountGameComponent implements OnInit {
  public formAccountinfoGame: FormGroup | any
  infoGame: any | undefined;
  isDisabled: boolean = true;
  listGameProduct: any[] = [];
  GameProduct: GameProduct[] = [];

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,) {
    this.formAccountinfoGame = this.fb.group({
      accountGame: [''],
      nameAccountGame: [''],
      userGame: [''],
      statusAccount: [''],
      password: [''],

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    console.log(this.infoGame)
    this.connectApi.get('v1/gameproduct').subscribe((response: any) => {
      console.log(response)
      this.GameProduct = response
      this.listGameProduct = [...this.GameProduct];
      console.log(this.infoGame)
      const gameProduct = this.infoGame.gameProduct;
      const game = this.listGameProduct.find(g => g._id === gameProduct);
      if (game) {
        this.infoGame.nameGame = game.name;
      }
    })

    if (this.infoGame) {
      console.log(this.infoGame)
      this.formAccountinfoGame.controls['accountGame'].setValue(this.infoGame.nameGame !== undefined ? this.infoGame.nameGame : "");
      this.formAccountinfoGame.controls['nameAccountGame'].setValue(this.infoGame.username !== undefined ? this.infoGame.username : "");
      this.formAccountinfoGame.controls['userGame'].setValue(this.infoGame.nameAccount !== undefined ? this.infoGame.nameAccount : "");
      this.formAccountinfoGame.controls['statusAccount'].setValue(this.infoGame.isActive !== false ? 'Đang sử dụng' : 'Ngưng sử dụng');
      this.formAccountinfoGame.controls['password'].setValue(this.infoGame.password !== undefined ? this.infoGame.password : "");
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
