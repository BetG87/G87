import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { Bank } from '../entity/bank';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalComponent } from '../my-modal/my-modal.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public submitted: boolean = false;
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';
  public formRegister: FormGroup | any

  constructor(private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formRegister = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberPhone: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      bankId: ['', Validators.required]

    });
  }
  bankName = '';
  selectedBank: any;
  bankNameLists: any;

  onBankChange(event: any): void {
    console.log(event);
  }
  ngOnInit(): void {
    this.connectApi.get('v1/bank').subscribe((response) => {
      console.log(response)
      this.bankNameLists = response;
      this.selectedBank = this.bankNameLists[0]._id;
    });
  }

  public onSubmit(): void {
    console.log(this.formRegister)
    var bankId = this.selectedBank;

    const requestRegister =
    {
      ...this.formRegister.value,
      bankId: bankId
    }

    this.connectApi.post('v1/auth/register', requestRegister).subscribe((response) => {
      console.log(response)
      const modalRef = this.modalService.open(MyModalComponent, { size: "sm", backdrop: "static", keyboard: false });
      modalRef.componentInstance.Notification = "Thông Báo Đăng Kí";
      modalRef.componentInstance.contentNotification = "Bạn Đã Đăng Kí Thành CÔng";
      modalRef.componentInstance.command = "register"
      modalRef.result.then((result: any) => {
        console.log(result);
      }).catch((error: any) => {
        console.log(error);
      });
    },(response) => {
      const modalRef = this.modalService.open(MyModalComponent, {
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.Notification =
        'Thông Báo Đăng Kí';
      modalRef.componentInstance.contentNotification =
        'Đăng ký tài khoảng không thành công';
      modalRef.result
        .then((result: any) => {
        })
        .catch((error: any) => {
          console.log(error);
        });
    });

  }

  register = () => {



  }





}
