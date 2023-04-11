import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../entity/transaction';
import { MyModalupdatetransactionsComponent } from '../my-modalupdatetransactions/my-modalupdatetransactions.component';

import { forkJoin, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managertransaction',
  templateUrl: './managertransaction.component.html',
  styleUrls: ['./managertransaction.component.scss']
})
export class ManagertransactionComponent implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerTransaction: Transaction[] = [];
  filteredTransactions: any[] = [];
  searchTerm: any;
  fullData: any[] = [];
  transactionsLoaded: boolean = false;
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

  async ngOnInit() {
    this.filteredTransactions = [];
    this.fullData = [];
    this.GetTransaction()
  }

  GetTransaction() {
    this.connectApi.get('v1/transaction').subscribe((response: any) => {
      console.log(response)
      this.managerTransaction = response
      this.filteredTransactions = [...this.managerTransaction];
      console.log(this.filteredTransactions)
      this.GetfullData(this.filteredTransactions)
    })
  }

  async GetfullData(datalist: any[]) {
    datalist.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log(datalist)
    this.fullData = datalist;
    this.currentPage = 1;
    this.transactionsLoaded = true;
    console.log(this.fullData)

  }
  updateTransaction(idaccounttransaction: any) {
    const infoTransactions = this.filteredTransactions.filter((item) => item._id === idaccounttransaction);
    console.log(infoTransactions[0]);
    const modalRef = this.modalService.open(MyModalupdatetransactionsComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoTransactions = infoTransactions[0];
    console.log(infoTransactions[0])
    modalRef.componentInstance.mode = "1";
    modalRef.componentInstance.Tittle = "Cập Nhập Giao Dịch";
    modalRef.componentInstance.buttonConfirm = "Cập Nhập";
    modalRef.result.then((result: any) => {
      if (result == true) {
        this.ngOnInit()
      }
      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  search() {
    console.log(this.fullData)
    if (!this.searchTerm) {
      this.fullData = [...this.managerTransaction];
    } else {
      this.fullData = this.managerTransaction.filter(accounttransaction => this.matchesSearchTerm(accounttransaction));
      this.fullData .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.currentPage = 1;
    }
  }

  matchesSearchTerm(accounttransaction: any) {
    const searchTerm = this.searchTerm.toLowerCase();
    let searchName
    let searchownerName
    let searchbankAccountNumberuser
    let searchbankAccountNumberAdmin
    let searchamount
    let nameStatus
    let date
    if (accounttransaction.user !== undefined) {
      accounttransaction.user.username = accounttransaction.user.username !== undefined ? accounttransaction.user.username : "";
      searchName = accounttransaction.user.username.toLowerCase().indexOf(searchTerm) > -1
    }
    if (accounttransaction.bankAccount !== undefined) {
      accounttransaction.bankAccount.ownerName = accounttransaction.bankAccount.ownerName !== undefined ? accounttransaction.bankAccount.ownerName : "";
      accounttransaction.bankAccount.bankAccountNumber = accounttransaction.bankAccount.bankAccountNumber !== undefined ? accounttransaction.bankAccount.bankAccountNumber : "";
      searchownerName = accounttransaction.bankAccount.ownerName.toLowerCase().indexOf(searchTerm) > -1
      searchbankAccountNumberuser = accounttransaction.bankAccount.bankAccountNumber.toLowerCase().indexOf(searchTerm) > -1
    }
    if (accounttransaction.bankAccountAdmin !== undefined) {
      accounttransaction.bankAccountAdmin.bankAccountNumber = accounttransaction.bankAccountAdmin.bankAccountNumber !== undefined ? accounttransaction.bankAccountAdmin.bankAccountNumber : "";
      searchbankAccountNumberAdmin = accounttransaction.bankAccountAdmin.bankAccountNumber.toLowerCase().indexOf(searchTerm) > -1
    }
    accounttransaction.amount = accounttransaction.amount !== undefined ? accounttransaction.amount : "";
    searchamount = accounttransaction.amount.toLowerCase().indexOf(searchTerm) > -1
    accounttransaction.nameStatus = accounttransaction.status.name !== undefined ? accounttransaction.status.name : "";
    nameStatus = accounttransaction.nameStatus.toLowerCase().indexOf(searchTerm) > -1;
    const datePipe = new DatePipe('en-US');
    let formattedDate = datePipe.transform(accounttransaction.date, 'yyyy/MM/dd');
    if (formattedDate) {
      date = formattedDate.toLowerCase().indexOf(searchTerm) > -1;
    }
    return searchName
      || searchownerName
      || searchbankAccountNumberuser
      || searchbankAccountNumberAdmin
      || searchamount
      || nameStatus
      || date
  }

  addTransaction() {
    const modalRef = this.modalService.open(MyModalupdatetransactionsComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.componentInstance.Tittle = "Tạo Mới Giao Dịch";
    modalRef.componentInstance.buttonConfirm = "Tạo Mới";
    modalRef.result.then((result: any) => {
      console.log(result);
      if (result == true) {
        this.ngOnInit()
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
  handleError(error: any) {
  }
}




