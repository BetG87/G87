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

    addStatus(){

    }
    search()
    {

    }
    updateStatus(status:Status){

    }
}
