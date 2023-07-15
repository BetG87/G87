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
  allUserName: any[] = [];
  bankNameLists: any;
  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private connectApi: ConnectApiService,) {
    this.formAccountinfoBank = this.fb.group({
      userName: [''],
      accountBank: [''],
      nameAccountBank: [''],
      userBank: [''],
      statusAccount: [''],
      typeAccount: [''],
      bankId: [''],

    });

  }
  public onSubmit(): void {

  }
  ngOnInit(): void {
    this.GetBank()
    this.GetUser()
  }
  GetBank() {
    this.connectApi.get('v1/bank').subscribe((response) => {
      this.bankNameLists = response;
    });
  }
  GetUser() {
    this.connectApi.get('v1/user').subscribe((response: any) => {
      this.allUserName = response
      if (this.infoBank) {
        this.formAccountinfoBank.controls['userName'].setValue(this.infoBank.user?._id !== undefined ? this.infoBank.user?._id : "");
        this.formAccountinfoBank.controls['accountBank'].setValue(this.infoBank.bankAccountNumber !== undefined ? this.infoBank.bankAccountNumber : "");
        this.formAccountinfoBank.controls['userBank'].setValue(this.infoBank.ownerName !== undefined ? this.infoBank.ownerName : "");
        this.formAccountinfoBank.controls['statusAccount'].setValue(this.infoBank.isActive !== undefined ? this.infoBank.isActive : "");
        this.formAccountinfoBank.controls['typeAccount'].setValue(this.infoBank.isAdmin !== undefined ? this.infoBank.isAdmin : true);
        this.formAccountinfoBank.controls['bankId'].setValue(this.infoBank.bankId !== undefined ? this.infoBank.bankId : "");
        this.formAccountinfoBank.get('userName').disable();
      }
    })
  }
  closeModal() {
    this.activeModal.close(true);
  }
  confirm() {
    this.activeModal.close(false);
  }
}
