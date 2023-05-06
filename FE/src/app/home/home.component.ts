import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from "@angular/core";
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DataShareService } from "../Services/DataShare/data-share.service";
import { ConnectApiService } from "../Services/Web/connect-api.service";
import { SessionStorageService } from "../Services/StorageService/session-storage.service";
import { CookieStorageService } from "../Services/StorageService/cookie-storage.service";
import { Router } from "@angular/router";
import { GameProduct } from "../entity/GameProduct";
import decode from "jwt-decode";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit {
  username?: string;
  userId?: string;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isLinkEnabled: Boolean = true;
  statusBong88: string | undefined;
  status2SBOBET: string | undefined;
  status3in1bet: string | undefined;
  statusLasvegas: string | undefined;
  gameProduct: GameProduct[] | undefined;
  gameProductAll: GameProduct[] | undefined;
  gameUserId: string[] = [];
  notification: any ;
  videoId: string | undefined;
  videoUrl: any;
  isStatus = [false, false, false, false];
  constructor(
    private dataShare: DataShareService,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private cookieStore: CookieStorageService,
    private sanitizer: DomSanitizer
  ) {
    this.videoId = "VgzRNVBFvbQ";
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    this.statusBong88 = "VÀO GAME";
    this.status3in1bet = "VÀO GAME";
    this.status2SBOBET = "VÀO GAME";
    this.statusLasvegas = "VÀO GAME";
    this.checkInit();
    this.connectApi.get("v1/gameproduct").subscribe((response: any) => {
      this.gameProductAll = response.filter((game: any) => {
        if (game?.isActive) {
          return true
        }
        else {
          return false
        }
      })


    })

    if (this.isLoggedIn) {
      this.connectApi.get("v1/user/" + this.userId).subscribe((response: any) => {
        console.log(response);
        this.isLinkEnabled = false;
        this.isAdmin = response['admin']
        this.gameProduct = response.gameProduct;
        if (this.gameProduct) {
          for (let i = 0; i < this.gameProduct.length; i++) {
            let id = this.gameProduct[i]['_id']
            this.gameUserId.push(id as any);
          }
        }
      });
    }
    this.connectApi.get("v1/notification").subscribe((response: any) => {
      console.log(response);
      this.notification = response
    });
  }
  ngOnInit(): void {

  }

  checkInit() {
    this.isLoggedIn = !!this.sessionStore.getToken();
    this.cookieStore.getCookie("auth-token");
    const token = this.sessionStore.getToken();
    console.log(this.sessionStore);
    if (token) {
      const payload = decode(token);
      if (this.isLoggedIn) {
        const user = this.sessionStore.getUser();
        this.username = user["username"];
        this.userId = user["_id"];
      }
    }
  }
  addGameBong88(id: any, action: any) {
    console.log(id)
    console.log(action)
    // nếu action = true thì mở modal hiện tk mk, = false thì push tele
  }
  routeInfo(index: number) {
    if (this.isLoggedIn) {
      const queryParams = { tab: index };
      this.route.navigate(['/account-info'], { queryParams });
    }
    else {
      // this.route.navigate(['/register']);
      const queryParams = { check: '1' };
      this.route.navigate(['/login'], { queryParams });

    }
  }
}


