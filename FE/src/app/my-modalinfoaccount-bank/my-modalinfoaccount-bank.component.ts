import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-my-modalinfoaccount-bank',
  templateUrl: './my-modalinfoaccount-bank.component.html',
  styleUrls: ['./my-modalinfoaccount-bank.component.scss']
})
export class MyModalinfoaccountBankComponent implements OnInit {
  public formAccountinfoBank: FormGroup | any
  infoBank: any | undefined;
  isDisabled: boolean = true;

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,) {
    this.formAccountinfoBank = this.fb.group({
      accountBank: [''],
      nameAccountBank: [''],
      userBank: [''],
      statusAccount: [''],

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    console.log(this.infoBank)

    if (this.infoBank) {
      console.log(this.infoBank)
      this.formAccountinfoBank.controls['accountBank'].setValue(this.infoBank.bankAccountNumber !== undefined ? this.infoBank.bankAccountNumber : "");
      this.formAccountinfoBank.controls['nameAccountBank'].setValue(this.infoBank.ownerName !== undefined ? this.infoBank.ownerName : "");
      this.formAccountinfoBank.controls['userBank'].setValue(this.infoBank.user !== undefined ? this.infoBank.user : "");
      this.formAccountinfoBank.controls['statusAccount'].setValue(this.infoBank.isActive !== undefined ? this.infoBank.isActive : "");
      console.log(this.infoBank)
    }


  }

  closeModal() {
    this.activeModal.close(true);
  }
  confirm() {
    this.activeModal.close(false);
  }

}
