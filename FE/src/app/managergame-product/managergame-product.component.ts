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
import { MyModalupdateProductComponent } from '../my-modalupdate-product/my-modalupdate-product.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-managergame-product',
  templateUrl: './managergame-product.component.html',
  styleUrls: ['./managergame-product.component.scss']
})
export class ManagergameProductComponent implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerGame: GameAccount[] = [];
  filteredGame: any[] = [];
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

  }

  ngOnInit(): void {
    this.connectApi.get('v1/gameproduct').subscribe((response: any) => {
      console.log(response)
      this.managerGame = response
      this.filteredGame = [...this.managerGame];
      console.log(this.filteredGame)
    })
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
        this.connectApi.post('v1/gameproduct/delete', meessage).subscribe((response: any) => {
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
        })
      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  updateAccountGame(Game: any) {

    const modalRef = this.modalService.open(MyModalupdateProductComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoGame = Game;
    modalRef.componentInstance.mode = "1";
    modalRef.componentInstance.TittleGame = "Cập Nhập Game";
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
    console.log(this.managerGame)
    console.log(this.filteredGame)
    if (!this.searchTerm) {
      this.filteredGame = [...this.managerGame];

    } else {
      console.log(this.filteredGame)
      console.log(this.managerGame)
      this.filteredGame = this.filteredGame.filter(Game => this.matchesSearchTerm(Game));
      this.filteredGame.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      this.currentPage = 1;
      console.log(this.filteredGame)
    }
  }

  matchesSearchTerm(Game: any) {
    Game.gameProduct = Game.name !== undefined ? Game.name : "";
    Game.nameAccount = Game.linkImage !== undefined ? Game.linkImage : "";
    Game.nameGame = Game.linkGame !== undefined ? Game.linkGame : "";


    const searchTerm = this.searchTerm.toLowerCase();
    return Game.name.toLowerCase().indexOf(searchTerm) > -1
      || Game.linkImage.toLowerCase().indexOf(searchTerm) > -1
      || Game.linkGame.toLowerCase().indexOf(searchTerm) > -1;
  }

  addGame() {
    const modalRef = this.modalService.open(MyModalupdateProductComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.componentInstance.TittleGame = "Thêm Mới Game";
    modalRef.componentInstance.buttonConfirm = "Thêm Mới";
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

