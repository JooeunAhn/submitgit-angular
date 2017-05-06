import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AppConfig} from "../../app.config";
import {Router} from "@angular/router";

interface auth{
  username: string,
  password: string
}

interface authSignUp{
  username: string,
  email: string;
  password1: string,
  password2: string
}

@Injectable()
export class AuthService {

  constructor(@Inject ('APP_CONFIG') private config: AppConfig, private http: Http, private router: Router) { }

  signup(formData: authSignUp): Observable<Response>{
    return this.http.post(
      `${this.config.BASE_URL}api/v1/rest-auth/registration/`,
      JSON.stringify(formData),
      {headers: new Headers({'Content-Type': "application/json"})}
    ).map(res => res.json())
  }

  login(formData: auth): Observable<Response>{
    return this.http.post(
      `${this.config.BASE_URL}api/v1/rest-auth/login/`,
      JSON.stringify(formData),
      {headers: new Headers({'Content-Type': "application/json"})})
  }

  logout(): void{
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  getProfile(): Observable<Response>{
    return this.http.get(
      `${this.config.BASE_URL}api/v1/profile/me/`,
      {headers: new Headers({
        'Content-Type': "application/json",
        "Authorization": `Token ${localStorage.getItem('auth_token')}`})}
    ).map(res => res.json());
  }

}
