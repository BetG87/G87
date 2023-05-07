import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  title = 'T89';

  username?: string;
  userId?: string;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  ngOnInit(): void {
    this.checkInit();
  }
  navbarOpen = false;
  @ViewChild('login') loginElement: ElementRef | undefined;

  constructor(private dataShare: DataShareService, private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService, private route: Router,
    private cookieStore: CookieStorageService) {

    this.checkInit();
    if(this.isLoggedIn)
    {
      this.connectApi.get('v1/user/' + this.userId).subscribe((response: any) => {
        console.log(response)
        this.isAdmin = response['admin']
      })

    }
  }

  signout() {
    this.sessionStore.signOut();
    this.dataShare.setToken("")
    this.dataShare.setDataUser(null);
    window.location.reload();
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    if (this.loginElement && this.navbarOpen) {
      this.navbarOpen = false;
    }
  }
  toggleNavbarmenu() {
    this.navbarOpen = !this.navbarOpen;
  }

  checkInit() {
    this.isLoggedIn = !!this.sessionStore.getToken();
    this.cookieStore.getCookie("auth-token")
    //console.log(this.cookieStore.getCookie("auth-token"))
    const token = this.sessionStore.getToken();
    if (token) {
      const payload = decode(token)
      if (this.isLoggedIn) {
        const user = this.sessionStore.getUser();
        //this.roles = payload['role'];
        //if (this.roles) {
        //  this.showAdminBoard = (this.roles == 'ROLE_ADMIN');
        //}
        this.username = user['username'];
        this.userId = user['_id']
      }
    }
  }
}
