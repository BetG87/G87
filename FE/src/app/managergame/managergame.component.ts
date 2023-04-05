import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameAccount } from '../entity/GameAccount';
import { MyModaldeleteComponent } from '../my-modaldelete/my-modaldelete.component';
import { MyModalinfoaccountGameComponent } from '../my-modalinfoaccount-game/my-modalinfoaccount-game.component';
import { MyModalupdateaccountGameComponent } from '../my-modalupdateaccount-game/my-modalupdateaccount-game.component';

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
    })

  }
  deleteAccountGame(idGame: any) {
    const title = "Xóa tài khoản Game";
    const content = "Bạn có chắc chắn muốn xóa tài khoản Game này?";
    const modalRef = this.modalService.open(MyModaldeleteComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });

  }
  infoAccountGame(idGame: any) {
    const infoGame = this.managerAccountGame.filter((item) => item._id === idGame);
    console.log(infoGame);
    const modalRef = this.modalService.open(MyModalinfoaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoGame = infoGame[0];
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  updateAccountGame(idGame: any) {
    const infoGame = this.managerAccountGame.filter((item) => item._id === idGame);
    console.log(infoGame);
    const modalRef = this.modalService.open(MyModalupdateaccountGameComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoGame = infoGame[0];
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });

  }
  search() {
    console.log(this.managerAccountGame)
    if (!this.searchTerm) {
      this.filteredAccountsGame = [...this.managerAccountGame];

    } else {
      console.log(this.filteredAccountsGame)
      console.log(this.managerAccountGame)
      this.filteredAccountsGame = this.managerAccountGame.filter(accountGame => this.matchesSearchTerm(accountGame));
      this.currentPage= 1;
    }
  }

  matchesSearchTerm(accountGame: any) {
    console.log(accountGame)
    accountGame._id = accountGame._id !== undefined ? accountGame._id : "" ;
    accountGame.username = accountGame.username !== undefined ? accountGame.username : "" ;
    accountGame.user = accountGame.user !== undefined ? accountGame.user : "" ;
    console.log(this.searchTerm)
    const searchTerm = this.searchTerm.toLowerCase();
    return accountGame._id.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.username.toLowerCase().indexOf(searchTerm) > -1
      || accountGame.user.toLowerCase().indexOf(searchTerm) > -1;
  }

}
