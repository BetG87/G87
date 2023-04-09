import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-my-addbank',
  templateUrl: './my-addbank.component.html',
  styleUrls: ['./my-addbank.component.scss']
})
export class MyAddbankComponent implements OnInit {
  public bankAccount: FormGroup | any
  userId: any
  constructor(private fb: FormBuilder,
    private connectApi: ConnectApiService,
    public activeModal: NgbActiveModal,
    private sessionStore: SessionStorageService,
  ) {

    this.bankAccount = this.fb.group({
      bankAccountNumber: ['', Validators.required],
      ownerName: ['', Validators.required],
      bankId: ['', Validators.required],
      user: ['', Validators.required]
    });
    const user = this.sessionStore.getUser()
    this.userId = user['_id'];
  }

  bankName = '';
  selectedBank: any;
  bankNameLists: any;

  onBankChange(event: any): void {
    this.bankAccount.get('bankId').setValue(event);
  }
  ngOnInit(): void {

    this.connectApi.get('v1/bank').subscribe((response) => {
      console.log(response)
      this.bankNameLists = response;
      this.selectedBank = this.bankNameLists[0]._id;
    });
  }


  UpdateBank = () => {
    console.log(this.bankAccount.value)
    this.bankAccount.get('bankId').setValue(this.selectedBank);
    this.bankAccount.get('user').setValue(this.userId);
    this.connectApi.post('v1/bankaccount', this.bankAccount.value).subscribe((response) => {
      console.log(response)

    });
    this.activeModal.close();

  }
  close = () => {

    this.activeModal.dismiss();

  }
}
