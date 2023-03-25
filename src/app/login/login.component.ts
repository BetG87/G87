import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public formLogin :FormGroup | any

  constructor(private fb: FormBuilder, private connectApi : ConnectApiService) { 
    
  }
  

onBankChange(event: any) {
  console.log(event);
}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
    
  }

  public onSubmit(): void {
    this.connectApi.post('v1/auth/login', this.formLogin.value).subscribe((response) => {
      console.log(response)

    });  }

  register() {
    
  }
clickInput(){
  console.log("event");
}
}

