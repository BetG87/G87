import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  public formRegister :FormGroup | any

  constructor(private fb: FormBuilder) { 
    
  }
  bankName = '';
  selectedBank: number | undefined;
  bankNameLists = [{id: 1, name: "VIETCOMBANK"}];

onBankChange(event: any) {
  console.log(event);
}
  ngOnInit(): void {
    this.formRegister = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    });
    // this.bankNameLists =[ {id: 1, name: "VIETCOMBANK"}]
    this.bankNameLists = [{id: 1, name: "VIETCOMBANK"}];
    console.log(this.bankNameLists)
    
  }

  public onSubmit(): void {
  }

  register() {
    
  }
}
