import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public submitted: boolean = false;
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';


  public formLogin: FormGroup | any;
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = true;
  isAdmin: boolean = false;
  showPassword: boolean = false;
  checkaccount = '0'
  constructor(
    private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private sessionStore: SessionStorageService,
    private route: Router,
    private dataShare: DataShareService,
    private cookieService: CookieStorageService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      showPassword: [false]

    });
  }

  ngOnInit(): void {
    const checkValue = this.activeRoute.snapshot.queryParamMap.get('check');
    if (checkValue != null) {
      this.checkaccount = checkValue
    }
    if (this.sessionStore.getToken()) {
      this.isLoggedIn = true;
    }
  }

  public onSubmit(): void {
    this.connectApi
      .post('v1/auth/login', this.formLogin.value)
      .subscribe((response) => {
        console.log(response);
        this.sessionStore.saveToken(response['accessToken']);

        this.dataShare.setToken(response['accessToken']);
        this.cookieService.setCookie('auth-token', response['accessToken']);
        this.sessionStore.saveUser({
          _id: response['_id'],
          username: response['username'],
          role: response['role']
        });
        this.dataShare.setDataUser({
          _id: response['_id'],
          username: response['username'],
          role: response['role']
        });
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        if (!response['isActive']) {
          const modalRef = this.modalService.open(MyModalComponent, {
            size: 'sm',
            backdrop: 'static',
            keyboard: false,
          });
          modalRef.componentInstance.Notification = 'Tài khoản bị khoá';
          modalRef.componentInstance.contentNotification =
            ' Tài khoản của bạn đã bị khoá. Xin vui lòng liên hệ với đội ngũ support';
          modalRef.result
            .then((result: any) => {
              this.sessionStore.signOut();
              this.dataShare.setToken('');
              this.dataShare.setDataUser(null);
              window.location.href = '/';
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
        // else if (response['gameAccounts'].length == 0) {
        //   const modalRef = this.modalService.open(MyModalComponent, {
        //     size: 'sm',
        //     backdrop: 'static',
        //     keyboard: false,
        //   });
        //   modalRef.componentInstance.Notification =
        //     'Tài khoản chưa có tài khoản game';
        //   modalRef.componentInstance.contentNotification =
        //     ' Tài khoản của bạn chưa có tài khoản game. Xin vui lòng liên hệ với đội ngũ support';
        //   modalRef.result
        //     .then((result: any) => {
        //       window.location.href = '/';
        //     })
        //     .catch((error: any) => {
        //       console.log(error);
        //     });
        // }
        else {
          window.location.href = '/';
        }

      }, (response) => {
        const modalRef = this.modalService.open(MyModalComponent, {
          size: 'sm',
          backdrop: 'static',
          keyboard: false,
        });
        modalRef.componentInstance.Notification =
          'Tài khoản';
        modalRef.componentInstance.contentNotification =
          ' Tài khoản hoặc mật khẩu không đúng';
        modalRef.result
          .then((result: any) => {
          })
          .catch((error: any) => {
            console.log(error);
          });
      });
  }

  clickInput() {
    console.log('event');
  }
  checkPassword() {
    this.formLogin.get('password').value
  }
}
