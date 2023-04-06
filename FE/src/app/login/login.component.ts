import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from '../Services/DataShare/data-share.service';
import { CookieStorageService } from '../Services/StorageService/cookie-storage.service';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitted: boolean = false;
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';

  public formLogin: FormGroup | any
  isLoggedIn: boolean =false;
  isLoginFailed: boolean = true;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private connectApi: ConnectApiService, private sessionStore: SessionStorageService, private route: Router,
    private dataShare: DataShareService, private cookieService: CookieStorageService) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });

  }


  ngOnInit(): void {


    if (this.sessionStore.getToken()) {
      this.isLoggedIn = true;
      this.isAdmin = this.sessionStore.getUser().isAdmin;
    }
  }

  public onSubmit(): void {
    this.connectApi.post('v1/auth/login', this.formLogin.value).subscribe((response) => {
      console.log(response)
      this.sessionStore.saveToken(response['accessToken'])

      this.dataShare.setToken(response['accessToken'])
      this.cookieService.setCookie("auth-token", response['accessToken'])
      this.sessionStore.saveUser({ _id: response['_id'], username: response['username'] })
      this.isLoggedIn = true;
      this.isLoginFailed = false;

      this.dataShare.setDataUser({ _id: response['_id'], username: response['username'] })
      window.location.href = '/';
    });  }


clickInput(){
  console.log("event");
}
}

