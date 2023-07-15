import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '../Services/StorageService/session-storage.service';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-my-modalshowinfogame',
  templateUrl: './my-modalshowinfogame.component.html',
  styleUrls: ['./my-modalshowinfogame.component.scss']
})
export class MyModalshowinfogameComponent implements OnInit {
  public formAccountinfo: FormGroup | any
  userId: any
  constructor(private fb: FormBuilder,
    private connectApi: ConnectApiService,
    public activeModal: NgbActiveModal,
    private sessionStore: SessionStorageService,
  ) {

    this.formAccountinfo = this.fb.group({
      gameAccount: [this.tkGame.length > 0 ? this.tkGame[0] : null, Validators.required],
      gamePassword: [null, Validators.required]
    });
    const user = this.sessionStore.getUser()
    this.userId = user['_id'];
  }
  selectGame: any;
  gameAccount: [] = [];
  gameProduct: any;
  bankName = '';
  tkGame: any[] = [];
  fulltkGame: any;
  accountlist: any;


  ngOnInit(): void {
    this.tkGame = []
    if (this.accountlist.length > 0) {
      this.accountlist = this.accountlist.filter((res: any) => {
        if (res?.isActive) {
          return true
        }else{
          return false
        }
      })
      this.tkGame = this.accountlist.map((account: { username: any; }) => account.username);
      this.fulltkGame = this.accountlist.map((account: { username: any; password: any; }) => ({ username: account.username, password: account.password }));
      this.formAccountinfo = this.fb.group({
        gameAccount: [this.tkGame.length > 0 ? this.tkGame[0] : null, Validators.required],
        gamePassword: [this.fulltkGame.length > 0 ? this.fulltkGame[0].password : null, Validators.required],
      });
    }
  }
  close = () => {
    this.activeModal.dismiss();
  }
  onTKChange(event: any): void {
    const filteredPasswords = this.fulltkGame
      .filter((item: { username: any; }) => item.username === event)
      .map((item: { password: any; }) => item.password);

    this.formAccountinfo.get('gamePassword').setValue(filteredPasswords);
  }
  @ViewChild('myInputpass', { static: false }) myInputpass: ElementRef | undefined;
  @ViewChild('myInputaccount', { static: false }) myInputaccount: NgSelectComponent | undefined;
  copyToClipboardAccount() {
    if (this.myInputaccount) {
      var selectedValue: any
      selectedValue = this.myInputaccount.selectedItems[0].label;
      const textarea = document.createElement('textarea');
      textarea.value = selectedValue;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }
  copyToClipboardPass() {
    if (this.myInputpass) {
      this.myInputpass.nativeElement.select();
      document.execCommand('copy');
    }
  }
}

