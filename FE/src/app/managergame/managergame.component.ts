import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameAccount } from '../entity/GameAccount';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalinfoaccountGameComponent } from '../my-modalinfoaccount-game/my-modalinfoaccount-game.component';
import { MyModalupdateaccountGameComponent } from '../my-modalupdateaccount-game/my-modalupdateaccount-game.component';
import { GameProduct } from '../entity/GameProduct';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-managergame',
  templateUrl: './managergame.component.html',
  styleUrls: ['./managergame.component.scss']
})
export class ManagergameComponent implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerAccountGame: GameAccount[] = [];
  filteredAccountsGame: any[] = [];
  searchTerm: any;
  listGameProduct: any[] = [];
  GameProduct: GameProduct[] = [];
  datetest: any[] = [];

  allAccount: any[] = [];
  listallAccount: any[] = [];
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
    this.connectApi.get('v1/gameaccount').subscribe((response: any) => {
      console.log(response)
      this.managerAccountGame = response
      this.filteredAccountsGame = [...this.managerAccountGame];
      console.log(this.filteredAccountsGame)
      this.connectApi.get('v1/gameproduct').subscribe((response: any) => {
        console.log(response)
        this.GameProduct = response
        this.listGameProduct = [...this.GameProduct];
        console.log(this.listGameProduct)

        for (let i = 0; i < this.filteredAccountsGame.length; i++) {
          const gameProduct = this.filteredAccountsGame[i].gameProduct;
          const game = this.listGameProduct.find(g => g._id === gameProduct);
          if (game) {
            this.filteredAccountsGame[i].nameGame = game.name;
          }
        }
        console.log(this.filteredAccountsGame)
        this.connectApi.get('v1/user').subscribe((response: any) => {
          console.log(response)
          this.allAccount = response
          this.listallAccount = [...this.allAccount];
          console.log(this.listallAccount)
          for (let i = 0; i < this.filteredAccountsGame.length; i++) {
            const accountId = this.filteredAccountsGame[i].user;
            const account = this.listallAccount.find(g => g._id === accountId);
            if (account) {
              this.filteredAccountsGame[i].nameAccount = account.username;
            }
          }
          this.GetfullData(this.filteredAccountsGame)
          // this.filteredAccountsGame.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          // this.filteredAccountsGame = [...this.filteredAccountsGame];

          // this.currentPage = 1
        })
      })
    })
  }
  async GetfullData(datalist: any[]) {
    datalist.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    console.log(datalist)
    this.filteredAccountsGame = datalist;
    this.currentPage = 1;
    // this.transactionsLoaded = true;
    console.log(this.filteredAccountsGame)

  }
  deleteAccountGame(idGame: any) {
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
        this.connectApi.post('v1/gameaccount/delete', meessage).subscribe((response: any) => {
          if (response == "Delete successfully") {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Xóa Tài Khoản Game';
            modalRef.componentInstance.contentNotification =
              'Xóa tài khoản Game thành công';
            modalRef.componentInstance.command = "deleteAccountGame";
            modalRef.result
              .then((result: any) => {
                this.ngOnInit()
              })
              .catch((error: any) => {
                console.log(error);
              });
          }
        })
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
  infoAccountGame(Game: any) {
    console.log(Game);
    const modalRef = this.modalService.open(MyModalinfoaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoGame = Game;
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  updateAccountGame(Game: any) {
    console.log(Game);
    const modalRef = this.modalService.open(MyModalupdateaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoGame = Game;
    modalRef.componentInstance.mode = "1";
    modalRef.componentInstance.TittleGame = "Cập Nhập Tài Khoản Game";
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
    console.log(this.managerAccountGame)
    console.log(this.filteredAccountsGame)
    this.filteredAccountsGame = [...this.managerAccountGame];
    if (this.searchTerm) {
      console.log(this.filteredAccountsGame)
      console.log(this.managerAccountGame)
      this.filteredAccountsGame = this.filteredAccountsGame.filter(accountGame => this.matchesSearchTerm(accountGame));
      this.filteredAccountsGame.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      this.currentPage = 1;
      console.log(this.filteredAccountsGame)
    }
  }

  matchesSearchTerm(accountGame: any) {
    accountGame.gameProduct = accountGame.gameProduct !== undefined ? accountGame.gameProduct : "";
    accountGame.nameAccount = accountGame.nameAccount !== undefined ? accountGame.nameAccount : "";
    accountGame.nameGame = accountGame.nameGame !== undefined ? accountGame.nameGame : "";
    accountGame.password = accountGame.password !== undefined ? accountGame.password : "";
    accountGame.username = accountGame.username !== undefined ? accountGame.username : "";

    const searchTerm = this.searchTerm.toLowerCase();
    return accountGame.gameProduct.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.nameAccount.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.nameGame.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.password.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.username.toLowerCase().indexOf(searchTerm) > -1;
  }

  addGame() {
    const modalRef = this.modalService.open(MyModalupdateaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.componentInstance.TittleGame = "Tạo Tài Khoản Game";
    modalRef.componentInstance.buttonConfirm = "Tạo Tài Khoản";
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
