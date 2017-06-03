import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  public form:FormGroup;
  public username:AbstractControl;
  public email:AbstractControl;
  public password1:AbstractControl;
  public password2:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;
  public signUpErrorMessages = {
    username: null,
    email: null,
    password1: null,
    password2: null,
  };

  constructor(fb:FormBuilder, private router: Router, private authService: AuthService) {

    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password1': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        'password2': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }, {validator: EqualPasswordsValidator.validate('password1', 'password2')})
    });

    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password1 = this.passwords.controls['password1'];
    this.password2 = this.passwords.controls['password2'];
  }

  public onSubmit(values):void {

    this.signUpErrorMessages = {
      username: null,
      email: null,
      password1: null,
      password2: null,
    };

    this.submitted = true;

    if (this.form.valid) {
      this.authService.signup(
        {
          username: values.username,
          email: values.email,
          password1: values.passwords.password1,
          password2: values.passwords.password2
        }
      ).subscribe(
        (data) => {
          // TODO 이메일 보냈다는 페이지나 콘솔로그 alert 띄워주면 될 듯?
          alert("이메일을 확인해주세요!");
          this.router.navigate(['/login']);
        },
        (err) => {
          let errors = err.json();
          for(let key of Object.keys(errors)){
            this.signUpErrorMessages[key]=errors[key][0];
          }
          console.log(this.signUpErrorMessages);
        }
      );
    }
  }
}
