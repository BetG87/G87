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
import { GameProduct } from '../entity/GameProduct';


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
  listGameProduct: any[] = [];
  GameProduct: GameProduct[] = [];
  allUser: any[] = [];
  listallUser: any[] = [];
  allStatus: any[] = [];
  listallStatus: any[] = [];
  allBankAccount: any[] = [];
  listallBankAccount: any[] = [];
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
    await this.GetTransaction();
    await this.GetGameProduct();
    await this.GetUser();
    await this.GetStatus();
    await this.GetBankAccount();
    this.currentPage = 1
    this.transactionsLoaded = true;
  }

  GetTransaction() {
    this.connectApi.get('v1/transaction').subscribe((response: any) => {
      console.log(response)
      this.managerTransaction = response
      this.filteredTransactions = [...this.managerTransaction];
      console.log(this.filteredTransactions)
    })
    return Promise.resolve();
  }
  GetGameProduct() {
    this.connectApi.get('v1/gameproduct').subscribe((response: any) => {
      console.log(response)
      this.GameProduct = response
      this.listGameProduct = [...this.GameProduct];
      console.log(this.listGameProduct)

      for (let i = 0; i < this.filteredTransactions.length; i++) {
        const gameProduct = this.filteredTransactions[i].gameProduct;
        const game = this.listGameProduct.find(g => g._id === gameProduct);
        if (game) {
          this.filteredTransactions[i].nameGame = game.name;
        }
      }
    })
    return Promise.resolve();
  }

  GetUser() {
    this.connectApi.get('v1/user').subscribe((response: any) => {
      console.log(response)
      this.allUser = response
      this.listallUser = [...this.allUser];
      console.log(this.listallUser)
      for (let i = 0; i < this.filteredTransactions.length; i++) {
        const accountId = this.filteredTransactions[i].user;
        const account = this.listallUser.find(g => g._id === accountId);
        if (account) {
          this.filteredTransactions[i].nameUser = account.username;
        }
      }
      return Promise.resolve();
    })
  }

  GetStatus() {
    this.connectApi.get('v1/status').subscribe((response: any) => {
      console.log(response)
      this.allStatus = response
      this.listallStatus = [...this.allStatus];
      console.log(this.listallStatus)
      for (let i = 0; i < this.filteredTransactions.length; i++) {
        const statusId = this.filteredTransactions[i].status;
        const status = this.listallStatus.find(g => g._id === statusId);
        if (status) {
          this.filteredTransactions[i].nameStatus = status.name;
        }
      }
    })
    return Promise.resolve();
  }
  GetBankAccount() {
    this.connectApi.get('v1/bankaccount').subscribe((response: any) => {
      console.log(response)
      this.allBankAccount = response
      this.listallBankAccount = [...this.allBankAccount];
      console.log(this.listallBankAccount)
      for (let i = 0; i < this.filteredTransactions.length; i++) {
        const bankAccountId = this.filteredTransactions[i].bankAccount;
        const bankAccount = this.listallBankAccount.find(g => g._id === bankAccountId);
        if (bankAccount) {
          this.filteredTransactions[i].namebankAccount = bankAccount.ownerName;
          this.filteredTransactions[i].numberbankAccount = bankAccount.bankAccountNumber;
        }
        const bankAccountAdminId = this.filteredTransactions[i].bankAccountAdmin;
        const bankAccountAdmin = this.listallBankAccount.find(g => g._id === bankAccountAdminId);
        if (bankAccountAdmin) {
          this.filteredTransactions[i].namebankAccountAdmin = bankAccount.ownerName;
          this.filteredTransactions[i].numberbankAccountAdmin = bankAccount.bankAccountNumber;

        }
      }
      console.log(this.filteredTransactions)
      return Promise.resolve();
    })

  }
  updateTransactionGame(idGame: any) {
    const infoTransactions = this.filteredTransactions.filter((item) => item._id === idGame);
    console.log(infoTransactions);
    const modalRef = this.modalService.open(MyModalupdatetransactionsComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoTransactions = infoTransactions[0];
    modalRef.componentInstance.mode = "1";
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
    console.log(this.managerTransaction)
    if (!this.searchTerm) {
      this.filteredTransactions = [...this.managerTransaction];

    } else {
      console.log(this.filteredTransactions)
      console.log(this.managerTransaction)
      this.filteredTransactions = this.managerTransaction.filter(accountGame => this.matchesSearchTerm(accountGame));
      this.currentPage = 1;
    }
  }

  matchesSearchTerm(accountGame: any) {
    accountGame.nameUser = accountGame.nameUser !== undefined ? accountGame.nameUser : "";
    accountGame.namebankAccount = accountGame.namebankAccount !== undefined ? accountGame.namebankAccount : "";
    accountGame.numberbankAccount = accountGame.numberbankAccount !== undefined ? accountGame.numberbankAccount : "";
    accountGame.namebankAccountAdmin = accountGame.namebankAccountAdmin !== undefined ? accountGame.namebankAccountAdmin : "";
    accountGame.amount = accountGame.amount !== undefined ? accountGame.amount : "";
    accountGame.nameStatus = accountGame.nameStatus !== undefined ? accountGame.nameStatus : "";

    const searchTerm = this.searchTerm.toLowerCase();
    return accountGame.nameUser.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.namebankAccount.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.numberbankAccount.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.namebankAccountAdmin.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.amount.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.nameStatus.toLowerCase().indexOf(searchTerm) > -1;
  }

  addTransaction() {
    const modalRef = this.modalService.open(MyModalupdatetransactionsComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.result.then((result: any) => {
      console.log(result);
      if (result == true) {
        this.ngOnInit()
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
}



