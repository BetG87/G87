import { Component } from '@angular/core';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { MyModalupdateanotificationComponent } from '../my-modalupdateanotification/my-modalupdateanotification.component';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-managernotification',
  templateUrl: './managernotification.component.html',
  styleUrls: ['./managernotification.component.scss']
})
export class ManagernotificationComponent{
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerInfoUpdate: [] = [];
  filteredInfoUpdate: any[] = [];
  searchTerm: any;
  fullData: any[] = [];
  InfoUpdateLoaded: boolean = false;
  constructor(private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filteredInfoUpdate = [];
    this.fullData = [];
    this.GetInfoUpdate()
  }

  addInfoupdate() {
    const modalRef = this.modalService.open(MyModalupdateanotificationComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.Tittle = "Tạo Mới Thông báo cập nhập";
    modalRef.componentInstance.buttonConfirm = "Đăng ký";
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

  updateInfoUpdate(notification : any) {
    const modalRef = this.modalService.open(MyModalupdateanotificationComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.mode = "1";
    modalRef.componentInstance.infonotification = notification;
    modalRef.componentInstance.Tittle = "Chỉnh sửa Thông báo cập nhập";
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
  deleteInfoUpdate(infoupdate: any) {
    const title = "Xóa Thông báo cập nhập";
    const content = "Bạn có chắc chắn muốn xóa Thông báo cập nhập?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "sm", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const message = {
          "_id": infoupdate?._id
        }
        console.log(message)
        this.connectApi.post('v1/notification/delete', message).subscribe((response: any) => {
          console.log(response)
          if (response == "Delete successfully") {
            const modalRef = this.modalService.open(MyModalComponent, {
              size: 'sm',
              backdrop: 'static',
              keyboard: false,
            });
            modalRef.componentInstance.Notification =
              'Thông Báo Xóa Trạng Thái';
            modalRef.componentInstance.contentNotification =
              'Xóa trạng thái thành công';
            modalRef.componentInstance.command = "deletenotification";
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
  GetInfoUpdate() {
    this.connectApi.get('v1/notification').subscribe((response: any) => {
      console.log(response)
      this.managerInfoUpdate = response
      this.filteredInfoUpdate = [...this.managerInfoUpdate];
      console.log(this.filteredInfoUpdate)
      this.GetfullData(this.filteredInfoUpdate)
    })
  }

  async GetfullData(datalist: any[]) {
    datalist.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log(datalist)
    this.fullData = datalist;
    this.currentPage = 1;
    this.InfoUpdateLoaded = true;
    console.log(this.fullData)

  }
  search() {
    console.log(this.fullData)
    if (!this.searchTerm) {
      this.fullData = [...this.managerInfoUpdate];
    } else {
      this.fullData = this.managerInfoUpdate.filter(notification => this.matchesSearchTerm(notification));
      this.fullData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.currentPage = 1;
    }
  }
  matchesSearchTerm(notification: any) {
    notification.content = notification.content !== undefined ? notification.content : "";
    notification.isActive = notification.isActive !== undefined ? notification.isActive : "";
    notification.createdAt = notification.createdAt !== undefined ? notification.createdAt : "";
    console.log(this.searchTerm)
    const searchTerm = this.searchTerm.toLowerCase();
    return notification.content.toLowerCase().indexOf(searchTerm) > -1
      || notification.createdAt.toLowerCase().indexOf(searchTerm) > -1
  }
}


