import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-getoutmoney',
  templateUrl: './my-getoutmoney.component.html',
  styleUrls: ['./my-getoutmoney.component.scss']
})
export class MyGetoutmoneyComponent implements OnInit {
  ngOnInit(): void {
  }
  modal: any;
  
  constructor(public activeModal: NgbActiveModal,
    private router: Router) {}
  
    closeModal() {
      this.activeModal.close();
      // this.router.navigate(['/login']);
    }
  }