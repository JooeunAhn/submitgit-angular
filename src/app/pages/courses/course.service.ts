import {Injectable, Inject} from '@angular/core';
import {AppConfig} from "../../app.config";
import {Observable} from "rxjs/Observable";
import {Response, Http, Headers} from "@angular/http";
import {Course} from './course.model';
import {FormGroup} from '@angular/forms';


@Injectable()
export class CourseService {

  constructor(@Inject ('APP_CONFIG') private config: AppConfig, private http: Http) {
  }

  getCourses(): Observable<Course[]> {
    return this.http.get(`${this.config.BASE_URL}api/v1/course/`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      })
      .map((res: Response) => <Course[]>res.json());
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get(
      `${this.config.BASE_URL}api/v1/course/` + id + `/`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      })
      .map((res: Response) => <Course>res.json());
  }

  updateCourse(id: string, fd, attachments) {

    let body = new FormData();

    body.append('title', fd.title);
    body.append('attachments', attachments);
    body.append('content', fd.content);
    body.append('year', fd.year);
    body.append('semester', fd.semester);

    return this.http.put(
      `${this.config.BASE_URL}api/v1/course/` + id + `/`,
      body,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
      )
      .map(res => res.json());
  }

  // getCourses(){
  //   return this.http.get(`${this.config.BASE_URL}api/v1/course/`,
  //     {headers: new Headers({
  //       'Content-Type': "application/json",
  //       'Authorization': `Token ${localStorage.getItem('auth_token')}`
  //     })}).map(res=>res.json())
  // }
}
