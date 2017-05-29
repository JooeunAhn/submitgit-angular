import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Http} from '@angular/http';
import {AuthService} from '../../../../../../shared/services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalContent: string = ``;
  assignment: any = new Object();

  constructor(private activeModal: NgbActiveModal, private http: Http, private authService: AuthService) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  downloadCode(url) {
    window.open(url);
  }

}
