import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Http} from '@angular/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalContent: string = ``;
  student_id: string = ``;
  assignment: any = new Object();
  private errorMessage: string = "";

  constructor(private activeModal: NgbActiveModal, private http: Http) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

}
