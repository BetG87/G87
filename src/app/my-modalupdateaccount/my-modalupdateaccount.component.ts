import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-modalupdateaccount',
  templateUrl: './my-modalupdateaccount.component.html',
  styleUrls: ['./my-modalupdateaccount.component.scss']
})
export class MyModalupdateaccountComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.info)
  }
  info: [] | undefined;
  constructor(public activeModal: NgbActiveModal, 
    private router: Router) {
      
    }
  
    closeModal() {
      this.activeModal.close(true);
    }
    confirm(){
      this.activeModal.close(false);
    }
  }