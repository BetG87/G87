import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-modaldelete',
  templateUrl: './my-modaldelete.component.html',
  styleUrls: ['./my-modaldelete.component.scss']
})

export class MyModaldeleteComponent implements OnInit {
  ngOnInit(): void {
  }
  modal: any;
  title: string = "";
  content : string = "";
  constructor(public activeModal: NgbActiveModal, 
    private router: Router) {
      
    }
  
    closeModal() {
      this.activeModal.close(false);
    }
    confirm(){
      this.activeModal.close(true);
    }
  }