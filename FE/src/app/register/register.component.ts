import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectApiService } from '../Services/Web/connect-api.service';
import { Bank } from '../entity/bank';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { faL } from '@fortawesome/free-solid-svg-icons';



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
  confirm: boolean = false
  showerrorconfirm = ''
  public formRegister: FormGroup | any


  constructor(private fb: FormBuilder,
    private connectApi: ConnectApiService,
    private modalService: NgbModal) {
    this.formRegister = this.fb.group({
      fullName: [null, Validators.required],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password:  [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword:  [null, [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      numberPhone: [null, [Validators.required, Validators.minLength(8)]],
      bankAccountNumber: [null, [Validators.required, Validators.minLength(8)]],
      bankId: ['', Validators.required],
      showPassword: [false],
      showPasswordconfirm: [false]
      
    });


    this.connectApi.get('v1/bank').subscribe((response) => {
      console.log(response)
      this.bankNameLists = response;
      this.selectedBank = this.bankNameLists[0]._id;
    });
  }
 
  bankName = '';
  selectedBank: any;
  bankNameLists: any;

  onBankChange(event: any): void {
    console.log(event);
  }
  ngOnInit(): void {
 
  }

  onChangePassword() {
 
    if (this.formRegister.controls.password.value !== this.formRegister.controls.confirmPassword.value) {
      this.formRegister.controls.confirmPassword.setErrors({ notMatch: true });
    } else {
      this.formRegister.controls.confirmPassword.setErrors(null);
    }
  }
  
  onChangeConfirmPassword() {
  
    if (this.formRegister.controls.password.value !== this.formRegister.controls.confirmPassword.value) {
      this.formRegister.controls.confirmPassword.setErrors({ notMatch: true });
    } else {
      this.formRegister.controls.confirmPassword.setErrors(null);
    }
  }

  public onSubmit(): void {


  }
  


  register() {
    this.confirm = true
    if (this.confirm && this.formRegister.valid && this.showerrorconfirm == '') {
      
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
      }, (response) => {
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
  }

}
