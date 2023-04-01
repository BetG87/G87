import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-addmoney',
  templateUrl: './my-addmoney.component.html',
  styleUrls: ['./my-addmoney.component.scss']
})
export class MyAddmoneyComponent  implements OnInit {
  ngOnInit(): void {
  }
  modal: any;
  
  constructor(public activeModal: NgbActiveModal,
    private router: Router) {}
  
    closeModal() {
      this.activeModal.close();
      this.router.navigate(['/login']);
    }
  }
