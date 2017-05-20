import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.scss']
})
export class ProfileAddComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    console.log('app-profile-add');
    this.authService.getProfile().subscribe(
      data => {
        this.router.navigate(['..', 'view'], {relativeTo: this.route});
      },
      err => {
        if (err.status == '403') {
          this.initForm();
        } else {
          console.log(err);
        }
      }
    );
  }

  initForm() {
    console.log('아니 ㅅㅂ 왜안되는거지??')
    this.profileForm = new FormGroup({
      'is_prof': new FormControl(false),
      'name': new FormControl('', Validators.required),
      'sid': new FormControl('', Validators.required),
      'github_token': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.profileService.addProfile(this.profileForm.value).subscribe(
      data => {
        this.router.navigate(['..', 'view']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
