import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { managerAccount } from '../entity/managerAccount';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalinfoaccountComponent } from '../my-modalinfoaccount/my-modalinfoaccount.component';
import { MyModalupdateaccountComponent } from '../my-modalupdateaccount/my-modalupdateaccount.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-manageraccount',
  templateUrl: './manageraccount.component.html',
  styleUrls: ['./manageraccount.component.scss']
})
export class ManageraccountComponent implements OnInit {
  getToken: string = "";
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerAccount: managerAccount[] = [];
  filteredAccounts: any[] = [];
  searchTerm: any;

  ngOnInit(): void {

    this.connectApi.get('v1/user/').subscribe((response: any) => {
      console.log(response)
      this.managerAccount = response

      this.filteredAccounts = [...this.managerAccount];
      this.filteredAccounts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.log(this.filteredAccounts)
    })
  }


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

  deleteAccount(_id: any) {
    const title = "Xóa tài khoản";
    const content = "Bạn có chắc chắn muốn xóa tài khoản này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "sm", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      console.log(result);
      if (result) {
        const message = {
          "_id": _id
        }
        this.connectApi.post('v1/user/delete', message).subscribe((response: any) => {
          console.log(response)
          if (response == "Delete successfully") {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Xóa Tài Khoản';
            modalRef.componentInstance.contentNotification =
              'Xóa tài khoản thành công';
            modalRef.componentInstance.command = "deleteUser";
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
  infoAccount(_id: any) {
    const info = this.managerAccount.filter((item) => item._id === _id);
    console.log(info);
    const modalRef = this.modalService.open(MyModalinfoaccountComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.info = info[0];
    modalRef.result.then((result: any) => {

      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  updateAccount(_id: any) {
    const info = this.managerAccount.filter((item) => item._id === _id);
    console.log(info);
    const modalRef = this.modalService.open(MyModalupdateaccountComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "1";
    modalRef.componentInstance.info = info;
    modalRef.componentInstance.Tittle = "Chỉnh sửa thông tin tài khoản";
    modalRef.componentInstance.buttonConfirm = "Cập Nhập";
    modalRef.result.then((result: any) => {
      if (result == true) {
        console.log(result)
        this.ngOnInit()
      }
      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }
  search() {
    console.log(this.managerAccount)
    this.filteredAccounts = [...this.managerAccount];
    if (this.searchTerm) {
      console.log(this.filteredAccounts)
      console.log(this.managerAccount)
      this.filteredAccounts = this.managerAccount.filter(account => this.matchesSearchTerm(account));
      this.filteredAccounts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.currentPage = 1;
    }
  }

  matchesSearchTerm(account: any) {
    console.log(account)
    account.username = account.username !== undefined ? account.username : "";
    account.email = account.email !== undefined ? account.email : "";
    account.numberPhone = account.numberPhone !== undefined ? account.numberPhone : "";
    account.fullName = account.fullName !== undefined ? account.fullName : "";
    console.log(this.searchTerm)
    const searchTerm = this.searchTerm.toLowerCase();
    return account.username.toLowerCase().indexOf(searchTerm) > -1
      || account.email.toLowerCase().indexOf(searchTerm) > -1
      || account.numberPhone.toLowerCase().indexOf(searchTerm) > -1
      || account.fullName.toLowerCase().indexOf(searchTerm) > -1;
  }
  addTransaction() {
    const modalRef = this.modalService.open(MyModalupdateaccountComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "0";
    modalRef.componentInstance.Tittle = "Tạo Mới Tài Khoản";
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
}