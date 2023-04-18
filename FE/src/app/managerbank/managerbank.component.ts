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
export class ManagerbankComponent  implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerBank: managerAccountBank[] = [];
  filteredBank: any[] = [];
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
    this.connectApi.get('v1/bank/').subscribe((response: any) => {
      console.log(response)
      this.managerBank = response
      this.filteredBank = [...this.managerBank];
      console.log(this.filteredBank)
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
    // const infoBank = this.managerBank.filter((item) => item.bankAccountNumber === idBank);
    // console.log(infoBank);
    // const modalRef = this.modalService.open(MyModalinfoaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    // modalRef.componentInstance.infoBank = infoBank[0];
    // modalRef.result.then((result: any) => {

    //   console.log(result);
    // }).catch((error: any) => {
    //   console.log(error);
    // });
  }
  updateAccountBank(idBank: any) {
    // const infoBank = this.managerBank.filter((item) => item.bankAccountNumber === idBank);
    // console.log(infoBank);
    // const modalRef = this.modalService.open(MyModalupdateaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    // modalRef.componentInstance.Tittle = "Cập Nhập Tài khoản ngân hàng";
    // modalRef.componentInstance.buttonConfirm = "Cập Nhập Tài khoản";
    // modalRef.componentInstance.infoBank = infoBank[0];
    // modalRef.componentInstance.mode = "1";
    // modalRef.result.then((result: any) => {
    //   console.log(result);
    //   if (result == true) {
    //     this.ngOnInit()
    //   }
    // }).catch((error: any) => {
    //   console.log(error);
    // });

  }
  search() {
    console.log(this.managerBank)
    if (!this.searchTerm) {
      this.filteredBank = [...this.managerBank];

    } else {
      console.log(this.filteredBank)
      console.log(this.managerBank)
      this.filteredBank = this.managerBank.filter(accountBank => this.matchesSearchTerm(accountBank));
      this.currentPage = 1;
    }
  }

  matchesSearchTerm(accountBank: any) {
    console.log(accountBank)
    accountBank.code = accountBank.code !== undefined ? accountBank.code : "";
    accountBank.name = accountBank.ownerNnameame !== undefined ? accountBank.name : "";
    accountBank.createdAt = accountBank.createdAt !== undefined ? accountBank.createdAt : "";
    console.log(this.searchTerm)
    const searchTerm = this.searchTerm.toLowerCase();
    return accountBank.code.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.name.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.createdAt.toLowerCase().indexOf(searchTerm) > -1;
  }

  addBank() {
    // const modalRef = this.modalService.open(MyModalupdateaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    // modalRef.componentInstance.mode = "0";
    // modalRef.componentInstance.Tittle = "Thêm Tài khoản ngân hàng";
    // modalRef.componentInstance.buttonConfirm = "Thêm Tài khoản";
    // modalRef.result.then((result: any) => {
    //   console.log(result);
    //   if (result == true) {
    //     this.ngOnInit()
    //   }
    // }).catch((error: any) => {
    //   console.log(error);
    // });
  }

}