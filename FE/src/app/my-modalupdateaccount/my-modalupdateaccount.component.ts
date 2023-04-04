import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-modalupdateaccount',
  templateUrl: './my-modalupdateaccount.component.html',
  styleUrls: ['./my-modalupdateaccount.component.scss']
})
export class MyModalupdateaccountComponent implements OnInit {
  public formAccountupdate: FormGroup | any
  
  info: any | undefined;
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router) {
    this.formAccountupdate = this.fb.group({
      id: [''],
      nameAccount: [''],
      numberPhone: [''],
      fullname: [''],
      email: [''],
      passWord : ['']
    });
  }

  ngOnInit(): void {
    console.log(this.info[0])

    if (this.info[0]) {
      this.formAccountupdate.controls['id'].setValue(this.info[0]._id !== undefined ? this.info[0]._id : "");
      this.formAccountupdate.controls['nameAccount'].setValue(this.info[0].username !== undefined ? this.info[0].username : "");
      this.formAccountupdate.controls['numberPhone'].setValue(this.info[0].numberPhone !== undefined ? this.info[0].numberPhone : "");
      this.formAccountupdate.controls['fullname'].setValue(this.info[0].fullName !== undefined ? this.info[0].fullName : "");
      this.formAccountupdate.controls['email'].setValue(this.info[0].email !== undefined ? this.info[0].email : "");
    }
  }
  public onSubmit(): void {

  }

  closeModal() {
    this.activeModal.close(true);
  }
  confirm() {
    this.activeModal.close(false);
  }
}