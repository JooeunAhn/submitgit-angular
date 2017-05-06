import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public loginErrorMessage: string = null;

  constructor(fb:FormBuilder, private router: Router, private authService: AuthService) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values):void {
    this.loginErrorMessage = null;
    this.submitted = true;
    if (this.form.valid) {
      this.authService.login({username: values.username, password: values.password}).subscribe(
        (data) => {
          if(data.status == 200){
            //TODO COOKIE 기반 토큰어스
            localStorage.setItem('auth_token', data.json()['key']);
            this.router.navigate(['pages']);
          }
        },
        (err) => {
          let errors = err.json();
          this.loginErrorMessage = errors['non_field_errors'][0];
        }
      );
    }
  }
}
