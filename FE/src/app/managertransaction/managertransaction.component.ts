import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../entity/transaction';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
// import { MyModalinfoaccountGameComponent } from '../my-modalinfoaccount-game/my-modalinfoaccount-game.component';
// import { MyModalupdateaccountGameComponent } from '../my-modalupdateaccount-game/my-modalupdateaccount-game.component';
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
    this.connectApi.get('v1/transaction').subscribe((response: any) => {
      console.log(response)
      this.managerTransaction = response
      this.filteredTransactions = [...this.managerTransaction];
      console.log(this.filteredTransactions)
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
        console.log(this.filteredTransactions)

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
          console.log(this.filteredTransactions)
          this.currentPage = 1
        })
      })
    })
  }
  deleteTransactionGame(idGame: any) {
    const title = "Xóa tài khoản Game";
    const content = "Bạn có chắc chắn muốn xóa tài khoản Game này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": idGame
        }
        console.log(meessage)
        this.connectApi.post('v1/transaction/delete', meessage).subscribe((response: any) => {
          console.log(response)
        })
        this.ngOnInit()
      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  // infoTransactionGame(idGame: any) {
  //   const infoGame = this.managerTransactionGame.filter((item) => item._id === idGame);
  //   console.log(infoGame);
  //   const modalRef = this.modalService.open(MyModalinfoaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
  //   modalRef.componentInstance.infoGame = infoGame[0];
  //   modalRef.result.then((result: any) => {

  //     console.log(result);
  //   }).catch((error: any) => {
  //     console.log(error);
  //   });
  // }
   updateTransactionGame(idGame: any) {
  //   const infoGame = this.managerTransactionGame.filter((item) => item._id === idGame);
  //   console.log(infoGame);
  //   const modalRef = this.modalService.open(MyModalupdateaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
  //   modalRef.componentInstance.infoGame = infoGame[0];
  //   modalRef.componentInstance.mode = "1";
  //   modalRef.result.then((result: any) => {
  //     if (result == true) {
  //       this.ngOnInit()
  //     }
  //     console.log(result);
  //   }).catch((error: any) => {
  //     console.log(error);
  //   });

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
    accountGame.gameProduct = accountGame.gameProduct !== undefined ? accountGame.gameProduct : "";
    accountGame.nameTransaction = accountGame.nameTransaction !== undefined ? accountGame.nameTransaction : "";
    accountGame.nameGame = accountGame.nameGame !== undefined ? accountGame.nameGame : "";
    accountGame.password = accountGame.password !== undefined ? accountGame.password : "";

    const searchTerm = this.searchTerm.toLowerCase();
    return accountGame.gameProduct.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.nameTransaction.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.nameGame.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.password.toLowerCase().indexOf(searchTerm) > -1;
  }

   addTransaction() {
  //   const modalRef = this.modalService.open(MyModalupdateaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
  //   modalRef.componentInstance.mode = "0";
  //   modalRef.result.then((result: any) => {
  //     console.log(result);
  //     if (result == true) {
  //       this.ngOnInit()
  //     }
  //   }).catch((error: any) => {
  //     console.log(error);
  //   });
   }

}

