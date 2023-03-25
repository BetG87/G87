import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from './Services/DataShare/data-share.service';
import { CookieStorageService } from './Services/StorageService/cookie-storage.service';
import { SessionStorageService } from './Services/StorageService/session-storage.service';
import { ConnectApiService } from './Services/Web/connect-api.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'G87';

  username?: string;
  isLoggedIn: boolean =false;
  ngOnInit(): void {
    this.checkInit();
  }
  navbarOpen = false;

  constructor(private dataShare: DataShareService, private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService, private route: Router,
    private cookieStore: CookieStorageService) {

    console.log("abc")
    this.dataShare.dataUser.subscribe(data => {
      console.log(data)
      this.checkInit();

    })
  }

  signout() {
    this.sessionStore.signOut();
    this.dataShare.setToken("")
    this.dataShare.setDataUser(null);
    window.location.reload();
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
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
        //this.roles = payload['role'];
        //if (this.roles) {
        //  this.showAdminBoard = (this.roles == 'ROLE_ADMIN');
        //}
        this.username = user['username'];
        console.log(user)
      }
    }
  }
}
