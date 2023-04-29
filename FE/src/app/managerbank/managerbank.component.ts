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
import { MyModalupdateBankComponent } from '../my-modalupdate-bank/my-modalupdate-bank.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

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
      this.filteredBank.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      console.log(this.filteredBank)
      console.log(this.managerBank)
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
      if (result) {
        const message = {
          "_id": idBank
        }
        this.connectApi.post('v1/bank/delete', message).subscribe((response: any) => {
          if (response == "Delete successfully") {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Xóa Tài Khoản Ngân Hàng';
            modalRef.componentInstance.contentNotification =
              'Xóa tài khoản Ngân Hàng thành công';
            modalRef.componentInstance.command = "deleteAccountBank";
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

  updateAccountBank(infoBank: any) {
    console.log(infoBank);
    const modalRef = this.modalService.open(MyModalupdateBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.Tittle = "Cập Nhập ngân hàng";
    modalRef.componentInstance.buttonConfirm = "Cập Nhập ";
    modalRef.componentInstance.infoBank = infoBank;
    modalRef.componentInstance.mode = "1";
    modalRef.result.then((result: any) => {
      console.log(result);
      if (result == true) {
        this.ngOnInit()
      }
    }).catch((error: any) => {
      console.log(error);
    });

  }
  search() {
    console.log(this.managerBank)
    if (!this.searchTerm) {
      this.filteredBank = [...this.managerBank];
    } else {
      console.log(this.filteredBank)
      console.log(this.managerBank)
      this.filteredBank = this.managerBank.filter(accountBank => this.matchesSearchTerm(accountBank));
      this.filteredBank.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      this.currentPage = 1;
    }
  }

  matchesSearchTerm(accountBank: any) {
    console.log(accountBank)
    accountBank.code = accountBank.code !== undefined ? accountBank.code : "";
    accountBank.name = accountBank.name !== undefined ? accountBank.name : "";
    accountBank.createdAt = accountBank.createdAt !== undefined ? accountBank.createdAt : "";
    console.log(this.searchTerm)
    const searchTerm = this.searchTerm.toLowerCase();
    return accountBank.code.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.name.toLowerCase().indexOf(searchTerm) > -1
      || accountBank.createdAt.toLowerCase().indexOf(searchTerm) > -1;
  }

  addBank() {
    const modalRef = this.modalService.open(MyModalupdateBankComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.componentInstance.Tittle = "Thêm ngân hàng";
    modalRef.componentInstance.buttonConfirm = "Thêm mới";
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