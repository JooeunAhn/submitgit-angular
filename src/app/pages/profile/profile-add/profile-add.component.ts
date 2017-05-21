import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.scss']
})
export class ProfileAddComponent implements OnInit {

  public form:FormGroup;
  public is_prof:AbstractControl;
  public name:AbstractControl;
  public sid:AbstractControl;
  public github_token:AbstractControl;


  constructor(fb:FormBuilder, private router: Router, private authService: AuthService, private http: Http) {
    this.form = fb.group({
      'is_prof': [false, Validators.compose([Validators.required])],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sid': [''],
      'github_token': [''],
    });
    this.is_prof = this.form.controls['is_prof'];
    this.name = this.form.controls['name'];
    this.sid = this.form.controls['sid'];
    this.github_token = this.form.controls['github_token']
  }

  ngOnInit() {
    console.log('profile-add');
  }

  onSubmit(values){
    console.log(values);
  }

}
