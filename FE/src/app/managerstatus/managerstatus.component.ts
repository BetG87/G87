import { Component } from '@angular/core';
import { Transaction } from '../entity/transaction';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { Router } from '@angular/router';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Status } from '../entity/status';
import { MyModalupdatestatusComponent } from '../my-modalupdatestatus/my-modalupdatestatus.component';
import { MyModalconfirmationmsgComponent } from '../my-modalconfirmationmsg/my-modalconfirmationmsg.component';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-managerstatus',
  templateUrl: './managerstatus.component.html',
  styleUrls: ['./managerstatus.component.scss']
})
export class ManagerstatusComponent {
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  managerStatus: Status[] = [];
  filteredStatus: any[] = [];
  searchTerm: any;
  fullData: any[] = [];
  statusLoaded: boolean = false;
  constructor(private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private cookieStore: CookieStorageService,
    private modalService: NgbModal, private fb: FormBuilder) {

    }

    ngOnInit() {
      this.filteredStatus = [];
      this.fullData = [];
      this.GetStatus()
    }

    addStatus(){
      const modalRef = this.modalService.open(MyModalupdatestatusComponent, { size: "lg", backdrop: "static", keyboard: false });
      modalRef.componentInstance.Tittle = "Tạo Mới Trạng Thái";
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

    updateStatus(status:Status){
      const modalRef = this.modalService.open(MyModalupdatestatusComponent, { size: "lg", backdrop: "static", keyboard: false });
      modalRef.componentInstance.mode = "1";
      modalRef.componentInstance.infoStatus = status;
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
    deleteStatus(status:Status)
    {
      const title = "Xóa Trạng Thái";
    const content = "Bạn có chắc chắn muốn xóa Trạng thái này?";
    const modalRef = this.modalService.open(MyModalconfirmationmsgComponent, { size: "sm", backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.result.then((result: any) => {
      if (result == true) {
        const meessage = {
          "_id": status?._id
        }
        console.log(meessage)
        this.connectApi.post('v1/status/delete', meessage).subscribe((response: any) => {
          console.log(response)
          this.ngOnInit()
        })

      } else
        console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });


    }
    GetStatus(){
      this.connectApi.get('v1/status').subscribe((response: any) => {
        console.log(response)
        this.managerStatus = response
        this.filteredStatus = [...this.managerStatus];
        console.log(this.filteredStatus)
        this.GetfullData(this.filteredStatus)
      })
    }

    async GetfullData(datalist: any[]) {
      datalist.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(datalist)
      this.fullData = datalist;
      this.currentPage = 1;
      this.statusLoaded = true;
      console.log(this.fullData)

    }
    search()
    {
      console.log(this.fullData)
      if (!this.searchTerm) {
        this.fullData = [...this.managerStatus];
      } else {
        this.fullData = this.managerStatus.filter(status => this.matchesSearchTerm(status));
        this.fullData .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.currentPage = 1;
      }
    }
    matchesSearchTerm(status: any) {
      status.id = status.id !== undefined ? status.id : "";
      status.name = status.name !== undefined ? status.name : "";
      status.createdAt = status.createdAt !== undefined ? status.createdAt : "";
      console.log(this.searchTerm)
      const searchTerm = this.searchTerm.toLowerCase();
      return status.name.toLowerCase().indexOf(searchTerm) > -1
        || status.createdAt.toLowerCase().indexOf(searchTerm) > -1
    }
}
