import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  username?: string;
  isLoggedIn: boolean = false;
  constructor(private dataShare: DataShareService, private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService, private route: Router,
    private cookieStore: CookieStorageService) {

    console.log("abc")
    this.dataShare.dataUser.subscribe(data => {
      console.log(data)
      this.checkInit();

    })
  }
  ngOnInit(): void {
  }

  checkInit() {
    this.isLoggedIn = !!this.sessionStore.getToken();
    this.cookieStore.getCookie("auth-token")
    console.log(this.cookieStore.getCookie("auth-token"))
    const token = this.sessionStore.getToken();
    if (token) {
      const payload = decode(token)
      console.log(payload)
      if (this.isLoggedIn) {
        const user = this.sessionStore.getUser();
        this.username = user['username'];
        console.log(user)
      }
    }
  }
}
