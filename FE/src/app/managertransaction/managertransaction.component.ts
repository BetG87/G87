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
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';


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
  allBank: any[] = [];
  transactionsLoaded: boolean = false;
  role? : String
  constructor(private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal, private fb: FormBuilder) {

    const user = this.sessionStore.getUser()
    this.role = user['role']
  }

  async ngOnInit() {
    this.filteredTransactions = [];
    this.fullData = [];
    this.GetTransaction();


  }

  GetTransaction() {
    this.connectApi.get('v1/transaction').subscribe((response: any) => {
      console.log(response)
      this.managerTransaction = response
      this.filteredTransactions = [...this.managerTransaction];
      console.log(this.filteredTransactions)
      this.GetBankAccount()

    })
  }

  async GetfullData(datalist: any[]) {
    datalist.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log(datalist)
    this.fullData = datalist;
    this.currentPage = 1;
    this.transactionsLoaded = true;
    console.log(this.fullData)
    this.search()

  }
  updateTransaction(accounttransaction: any) {
    const modalRef = this.modalService.open(MyModalupdatetransactionsComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoTransactions = accounttransaction;
    console.log(accounttransaction)
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
    this.fullData = [...this.managerTransaction];
    if (this.searchTerm) {
      this.fullData = this.managerTransaction.filter(accounttransaction => this.matchesSearchTerm(accounttransaction));    
    }
    this.fullData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.currentPage = 1;
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
    let note
    searchName = accounttransaction.user?.username.toLowerCase().indexOf(searchTerm) > -1
    searchownerName = accounttransaction.bankAccount?.ownerName.toLowerCase().indexOf(searchTerm) > -1
    searchbankAccountNumberuser = accounttransaction.bankAccount?.bankAccountNumber.toLowerCase().indexOf(searchTerm) > -1
    searchbankAccountNumberAdmin = accounttransaction.bankAccountAdmin?.bankAccountNumber.toLowerCase().indexOf(searchTerm) > -1
    accounttransaction.amount = accounttransaction.amount !== undefined ? accounttransaction.amount : "";
    searchamount = accounttransaction.amount?.toLowerCase().indexOf(searchTerm) > -1
    accounttransaction.nameStatus = accounttransaction.status?.name !== undefined ? accounttransaction.status.name : "";
    nameStatus = accounttransaction.nameStatus?.toLowerCase().indexOf(searchTerm) > -1;
    note = accounttransaction.note?.toLowerCase().indexOf(searchTerm) > -1;
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
      || note
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

  GetBankAccount() {
    this.connectApi.get('v1/bank').subscribe((response: any) => {
      this.allBank = response
      for (let i = 0; i < this.filteredTransactions.length; i++) {
        const bankId = this.filteredTransactions[i].bankAccount.bankId;
        const bankAccount = this.allBank.find(g => g._id === bankId);
        if (bankAccount) {
          this.filteredTransactions[i].bankAccount.namebank = bankAccount.name;
        }
      }
      console.log(this.filteredTransactions)
      this.GetfullData(this.filteredTransactions)
    })
  }

  deleteTransaction(id: any) {
    const title = "Xóa Giao Dịch";
    const content = "Bạn có chắc chắn muốn xóa giao dịch này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "sm", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const message = {
          "_id": id
        }
        console.log(message)
        this.connectApi.post('v1/transaction/delete', message).subscribe((response: any) => {
          console.log(response)
          if (response == "Delete successfully") {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Xóa Giao Dịch';
            modalRef.componentInstance.contentNotification =
              'Xóa giao dịch thành công';
            modalRef.componentInstance.command = "deleteTransaction";
            modalRef.result
              .then((result: any) => {
                this.ngOnInit()
              })
              .catch((error: any) => {
                console.log(error);
              });
          }
        })
      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
}




