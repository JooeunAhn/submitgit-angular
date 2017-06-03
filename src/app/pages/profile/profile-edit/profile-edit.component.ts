import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../profile-add/modal/modal.component';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  form: FormGroup;
  is_prof: AbstractControl;
  name: AbstractControl;
  sid: AbstractControl;
  profile;
  fb: FormBuilder = new FormBuilder();
  github_username;
  github: Subscription;

  constructor(private router: Router, private authService: AuthService, private http: Http,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      data => {
        this.profile = data;
        this.initForm(this.profile);
      },
      err => {
        console.log(err);
      }
    );

    this.github = this.authService.githubUsernameEventEmitter.subscribe(
      (data) => {
        this.github_username = data;
      }
    );

  }

  initForm(profile) {
    this.form = this.fb.group({
      // 'is_prof': [profile.is_prof, Validators.compose([Validators.required])],
      'name': [profile.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      'sid': [profile.sid],
    });
    // this.is_prof = this.form.controls['is_prof'];
    this.name = this.form.controls['name'];
    this.sid = this.form.controls['sid'];
  }

  onSubmit(values) {
    values['github_username'] = this.github_username;
    values['is_prof'] = this.profile.is_prof;
    this.authService.putProfile(values).subscribe(
      (data) => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  lgModalShow() {
    const activeModal = this.modalService.open(ModalComponent, {size: 'lg'});
    activeModal.componentInstance.modalHeader = 'Github Register';
  }

  ngOnDestroy() {
    this.github.unsubscribe();
  }
}
