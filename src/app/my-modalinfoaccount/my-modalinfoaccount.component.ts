import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountInfo } from '../entity/AccountInfo';

@Component({
  selector: 'app-my-modalinfoaccount',
  templateUrl: './my-modalinfoaccount.component.html',
  styleUrls: ['./my-modalinfoaccount.component.scss']
})
export class MyModalinfoaccountComponent implements OnInit {
  public formAccountinfo: FormGroup | any 
  accountGame: [] = [];
  id : string ="";
  nameAccount :string = "";
  numberPhone : string = "";
  fullName : string = "";
  email : string = "";
  dateCreateAccount : string = "";
  accountBank: [] = [];
  info: any | undefined;
  public onSubmit(): void {

  }
  ngOnInit(): void {
    console.log(this.info)
    if (this.info) {
       this.id = this.info._id;
       console.log(this.id)
      this.nameAccount = this.info.username !== undefined ? this.info.username :  ""
      this.numberPhone = this.info.numberPhone !== undefined ? this.info.numberPhone :  ""
      this.fullName = this.info.fullName !== undefined ? this.info.fullName :  ""
      this.email = this.info.email !== undefined ? this.info.email :  ""
      this.dateCreateAccount = this.info.createdAt !== undefined ? this.info.createdAt :  ""
      this.accountGame = this.info.gameAccounts !== undefined ? this.info.gameAccount :  ""
      this.accountBank =this.info.bankAccounts !== undefined ? this.info.bankAccount :  ""
    }
  }

  constructor(public activeModal: NgbActiveModal, 
    private router: Router) {
      
    }
  
    closeModal() {
      this.activeModal.close(true);
    }
    confirm(){
      this.activeModal.close(false);
    }
  }