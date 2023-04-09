import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss']
})
export class MyModalComponent implements OnInit {
  ngOnInit(): void {
  }
  modal: any;
  Notification: string = "";
  contentNotification: string = "";
  command: string = "";

  constructor(public activeModal: NgbActiveModal,
    private router: Router) { }

  closeModal() {

    if (this.command == "register") {

      this.activeModal.dismiss();
      this.router.navigate(['/login']);

    } else {
      this.activeModal.close(true);
    }



  }
}
