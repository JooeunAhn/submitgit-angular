import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AppConfig} from "../../app.config";

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

  constructor(@Inject ('APP_CONFIG') private config: AppConfig, private http: Http) { }

  signup(formData: authSignUp): Observable<Response>{
    return this.http.post(
      `${this.config.BASE_URL}api/v1/rest-auth/registration/`,
      JSON.stringify(formData),
      {headers: new Headers({'Content-Type': "application/json"})}
    ).map(data => data.json())
  }

}
