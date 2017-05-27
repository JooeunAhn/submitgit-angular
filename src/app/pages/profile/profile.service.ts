import {Inject, Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {

  constructor(@Inject('APP_CONFIG') private config: AppConfig, private http: Http) {
  }

  addProfile(formData): Observable<Response> {
    return this.http.post(
      `${this.config.BASE_URL}api/v1/profile/`,
      JSON.stringify(formData),
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      }).map(res => res.json());
  }

  updateProfile(formData): Observable<Response> {
    let fd = new FormData();

    return this.http.put(
      `${this.config.BASE_URL}api/v1/profile/me/`,
      JSON.stringify(formData),
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      }).map(res => res.json());
  }
}
