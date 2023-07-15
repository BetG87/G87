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
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-managerbankaccount',
  templateUrl: './managerbankaccount.component.html',
  styleUrls: ['./managerbankaccount.component.scss']
})
export class ManagerbankaccountComponent implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerAccountBank: managerAccountBank[] = [];
  filteredAccountsBank: any[] = [];
  searchTerm: any;
  bankNameLists: any;


  constructor(private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal, private fb: FormBuilder) {


    const getTokenac = this.sessionStore.getToken();
    if (getTokenac) {
      this.getToken = getTokenac;
    }
  }

  ngOnInit(): void {
    this.connectApi.get('v1/bankaccount/').subscribe((response: any) => {
      this.managerAccountBank = response
      this.filteredAccountsBank = [...this.managerAccountBank];
      this.filteredAccountsBank.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      this.connectApi.get('v1/bank').subscribe((response) => {
        this.bankNameLists = response;
        for (var i = 0; i < this.filteredAccountsBank.length; i++) {
          var bankAccounts = this.filteredAccountsBank[i].bankId;
            for (var k = 0; k < this.bankNameLists.length; k++) {
              if (bankAccounts == this.bankNameLists[k]._id) {
                var bankName = this.bankNameLists[k].name;
                this.filteredAccountsBank[i].bankName = bankName;  
              }
            }   
        }
      });

    
    })
  }
  deleteAccountBank(idBank: any) {
    const title = "Xóa tài khoản ngân hàng";
    const content = "Bạn có chắc chắn muốn xóa tài khoản ngân hàng này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": idBank
        }
        this.connectApi.post('v1/bankaccount/delete', meessage).subscribe((response: any) => {
          if (response == "Delete successfully") {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Xóa Tài Khoản Ngân Hàng';
            modalRef.componentInstance.contentNotification =
              'Xóa tài khoản ngân hàng thành công';
            modalRef.componentInstance.command = "deleteBank";
            modalRef.result
              .then((result: any) => {
                this.ngOnInit()
                this.search()
              })
              .catch((error: any) => {
              });
          }
        })
      }
    }).catch((error: any) => {
    });
  }
  infoAccountBank(infoBank: any) {

    const modalRef = this.modalService.open(MyModalinfoaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoBank = infoBank;
    modalRef.result.then((result: any) => {

    }).catch((error: any) => {
    });
  }
  updateAccountBank(infoBank: any) {
    const modalRef = this.modalService.open(MyModalupdateaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.Tittle = "Cập Nhập Tài khoản ngân hàng";
    modalRef.componentInstance.buttonConfirm = "Cập Nhập Tài khoản";
    modalRef.componentInstance.infoBank = infoBank;
    modalRef.componentInstance.mode = "1";
    modalRef.result.then((result: any) => {
      if (result == true) {
        this.ngOnInit()
        this.search()
      }
    }).catch((error: any) => {
    });

  }
  search() {
    this.filteredAccountsBank = [...this.managerAccountBank];
    if (this.searchTerm) {    
      this.filteredAccountsBank = this.managerAccountBank.filter(accountBank => this.matchesSearchTerm(accountBank));    
    }
    this.filteredAccountsBank.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    this.currentPage = 1;
  }

  matchesSearchTerm(accountBank: any) {
    accountBank.bankAccountNumber = accountBank.bankAccountNumber !== undefined ? accountBank.bankAccountNumber : "";
    accountBank.ownerName = accountBank.ownerName !== undefined ? accountBank.ownerName : "";
    if (accountBank.user !== null){
    accountBank.user.username = accountBank.user?.username !== undefined ? accountBank.user?.username : "";
  }
    const searchTerm = this.searchTerm.toLowerCase();
    return accountBank.bankAccountNumber.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.ownerName.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.user?.username.toLowerCase().indexOf(searchTerm) > -1;
  }

  addBank() {
    const modalRef = this.modalService.open(MyModalupdateaccountBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.componentInstance.Tittle = "Thêm Tài khoản ngân hàng";
    modalRef.componentInstance.buttonConfirm = "Thêm Tài khoản";
    modalRef.result.then((result: any) => {
      if (result == true) {
        this.ngOnInit()
        this.search()
      }
    }).catch((error: any) => {
    });
  }

}

