import {Injectable, Inject} from '@angular/core';
import {AppConfig} from "../../app.config";
import {Observable} from "rxjs";
import {Response, Http, Headers} from "@angular/http";

@Injectable()
export class CourseService {

  constructor(@Inject ('APP_CONFIG') private config: AppConfig, private http: Http) { }

  getCourses(): Observable<Response>{
    return this.http.get(`${this.config.BASE_URL}api/v1/course/`,
      {headers: new Headers({
        'Content-Type': "application/json",
        'Authorization': `Token ${localStorage.getItem('auth_token')}`
      })}).map(res=>res.json())
  }
}
