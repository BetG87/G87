import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { MyModalupdateLinkComponent } from '../my-modalupdate-link/my-modalupdate-link.component';

@Component({
  selector: 'app-managerlink',
  templateUrl: './managerlink.component.html',
  styleUrls: ['./managerlink.component.scss']
})
export class ManagerlinkComponent implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerLinkGame: [] = [];
  filteredLinkGame: any[] = [];
  searchTerm: any;
  constructor(private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.connectApi.get('v1/linkgame').subscribe((response: any) => {
      console.log(response)
      this.managerLinkGame = response
      this.filteredLinkGame = [...this.managerLinkGame];
      this.filteredLinkGame.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      console.log(this.filteredLinkGame)
    })
  }

  deleteAccountGame(idLinkGame: any) {
    const title = "Xóa Đường Dẫn Game";
    const content = "Bạn có chắc muốn xóa  Đường Dẫn Game này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "md", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": idLinkGame
        }
        console.log(meessage)
        this.connectApi.post('v1/linkgame/delete', meessage).subscribe((response: any) => {
          console.log(response)
          if (response == "Delete successfully") {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Xóa Đường Dẫn Game';
            modalRef.componentInstance.contentNotification =
              'Xóa Đường Dẫn Game thành công';
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
      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  updateAccountGame(linkGame: any) {

    const modalRef = this.modalService.open(MyModalupdateLinkComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.infoLinkGame = linkGame;
    modalRef.componentInstance.mode = "1";
    modalRef.componentInstance.TittleGame = "Cập Nhập Đường Dẫn";
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
    console.log(this.managerLinkGame)
    console.log(this.searchTerm)
    this.filteredLinkGame = [...this.managerLinkGame];
    if (this.searchTerm) {   
      console.log(this.filteredLinkGame)
      console.log(this.managerLinkGame)
      this.filteredLinkGame = this.filteredLinkGame.filter(Game => this.matchesSearchTerm(Game));
      this.filteredLinkGame.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      this.currentPage = 1;
      console.log(this.filteredLinkGame)
    }
  }

  matchesSearchTerm(Game: any) {
    Game.name = Game.name !== undefined ? Game.name : "";
    Game.linkGame = Game.linkGame !== undefined ? Game.linkGame : "";


    const searchTerm = this.searchTerm.toLowerCase();
    return Game.name.toLowerCase().indexOf(searchTerm) > -1
      || Game.linkGame.toLowerCase().indexOf(searchTerm) > -1;
  }

  addGame() {
    const modalRef = this.modalService.open(MyModalupdateLinkComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.componentInstance.TittleGame = "Thêm Mới Đường Dẫn";
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

