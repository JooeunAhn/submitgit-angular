import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Http} from "@angular/http";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalHeader: string;
  modalContent: string = `register github username`;
  github_username: string = "";
  errorMessage: string = "";

  constructor(private activeModal: NgbActiveModal, private http: Http, private authService: AuthService) {
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

  checkGithub(){
    this.http.get(`https://api.github.com/search/users?q=${this.github_username}`)
      .map(res=>res.json())
      .subscribe(
        (data)=>{
          this.errorMessage = "";
          let flag = data.items.filter((obj) => obj.login == this.github_username);
          console.log(flag);
          if(flag.length != 0){
            this.authService.githubUsernameEventEmitter.emit(flag[0].login);
            this.activeModal.close();
          }else{
            this.errorMessage="plz fill out right username";
          }
        },
        (err)=>{
          this.errorMessage="plz fill out the username";
        }
      )
  }
}
