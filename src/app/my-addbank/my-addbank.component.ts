import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-my-addbank',
  templateUrl: './my-addbank.component.html',
  styleUrls: ['./my-addbank.component.scss']
})
export class MyAddbankComponent implements OnInit {
 
  
  constructor(private fb: FormBuilder,
    private connectApi: ConnectApiService,
    public activeModal: NgbActiveModal
) { }

  
bankName = '';
  selectedBank: any;
  bankNameLists:any;

onBankChange(event: any): void {
  console.log(event);
}
  ngOnInit(): void {
    
    this.connectApi.get('v1/bank').subscribe((response) => {
      console.log(response)
      this.bankNameLists = response;
      this.selectedBank = this.bankNameLists[0]._id;
    });
  }


  UpdateBank = () => {
   
    this.activeModal.close();
  
  }
  close = () => {
   
    this.activeModal.dismiss();
  
  }
}