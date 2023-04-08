import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { managerAccountBank } from '../entity/managerAccountBank';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalinfoaccountBankComponent } from '../my-modalinfoaccount-bank/my-modalinfoaccount-bank.component';
import { MyModalupdateaccountBankComponent } from '../my-modalupdateaccount-bank/my-modalupdateaccount-bank.component';

@Component({
  selector: 'app-managerbank',
  templateUrl: './managerbank.component.html',
  styleUrls: ['./managerbank.component.scss']
})
export class ManagerbankComponent implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerAccountBank: managerAccountBank[] = [];
  filteredAccountsBank: any[] = [];
  searchTerm: any;


  constructor(private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal, private fb: FormBuilder) {


    const getTokenac = this.sessionStore.getToken();
    console.log(getTokenac)
    if (getTokenac) {
      this.getToken = getTokenac;
      console.log('getToken:', this.getToken);
    }
  }

  ngOnInit(): void {
    this.connectApi.get('v1/bankaccount/').subscribe((response: any) => {
      console.log(response)
      this.managerAccountBank = response
      this.filteredAccountsBank = [...this.managerAccountBank];
      console.log(this.filteredAccountsBank)
    })

  }
  deleteAccountBank(idBank: any) {
    const title = "Xóa tài khoản ngân hàng";
    const content = "Bạn có chắc chắn muốn xóa tài khoản ngân hàng này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });

  }
  infoAccountBank(idBank: any) {
    const infoBank = this.managerAccountBank.filter((item) => item.bankAccountNumber === idBank);
    console.log(infoBank);
    const modalRef = this.modalService.open(MyModalinfoaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoBank = infoBank[0];
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  updateAccountBank(idBank: any) {
    const infoBank = this.managerAccountBank.filter((item) => item.bankAccountNumber === idBank);
    console.log(infoBank);
    const modalRef = this.modalService.open(MyModalupdateaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoBank = infoBank[0];
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });

  }
  search() {
    console.log(this.managerAccountBank)
    if (!this.searchTerm) {
      this.filteredAccountsBank = [...this.managerAccountBank];

    } else {
      console.log(this.filteredAccountsBank)
      console.log(this.managerAccountBank)
      this.filteredAccountsBank = this.managerAccountBank.filter(accountBank => this.matchesSearchTerm(accountBank));
      this.currentPage= 1;
    }
  }

  matchesSearchTerm(accountBank: any) {
    console.log(accountBank)
    accountBank.bankAccountNumber = accountBank.bankAccountNumber !== undefined ? accountBank.bankAccountNumber : "" ;
    accountBank.ownerName = accountBank.ownerName !== undefined ? accountBank.ownerName : "" ;
    accountBank.user = accountBank.user !== undefined ? accountBank.user : "" ;
    console.log(this.searchTerm)
    const searchTerm = this.searchTerm.toLowerCase();
    return accountBank.bankAccountNumber.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.ownerName.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.user.toLowerCase().indexOf(searchTerm) > -1;
  }

}
