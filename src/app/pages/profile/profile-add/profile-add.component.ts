import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {Http} from "@angular/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "./modal/modal.component";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.scss']
})
export class ProfileAddComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public is_prof: AbstractControl;
  public name: AbstractControl;
  public sid: AbstractControl;
  github_username: string = '';
  github: Subscription;

  constructor(fb: FormBuilder, private router: Router, private authService: AuthService, private http: Http,
              private modalService: NgbModal) {
    this.form = fb.group({
      'is_prof': [false, Validators.compose([Validators.required])],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sid': [''],
    });
    this.is_prof = this.form.controls['is_prof'];
    this.name = this.form.controls['name'];
    this.sid = this.form.controls['sid'];
  }

  ngOnInit() {
    this.github = this.authService.githubUsernameEventEmitter.subscribe(
      (data) => {
        this.github_username = data;
      }
    );
  }


  onSubmit(values){
    values['github_username'] = this.github_username;
    this.authService.postProfile(values).subscribe(
      (data)=>{
        console.log(data);
        this.router.navigate(['/dashboard'])
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  lgModalShow() {
    const activeModal = this.modalService.open(ModalComponent, {size: 'lg'});
    activeModal.componentInstance.modalHeader = 'Github Register';
  }

  ngOnDestroy() {
    this.github.unsubscribe();
  }
}
