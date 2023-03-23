import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  public formRegister :FormGroup | any

  constructor(private fb: FormBuilder) { 
    
  }
  

onBankChange(event: any) {
  console.log(event);
}
  ngOnInit(): void {
  
    
  }

  public onSubmit(): void {
  }

  register() {
    
  }
clickInput(){
  console.log("event");
}
}

