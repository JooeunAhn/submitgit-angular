import {EventEmitter, Inject, Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, Response} from '@angular/http';
import {Course} from './course.model';


@Injectable()
export class CourseService {

  public coursesChanged: EventEmitter<Course[]>;

  constructor(@Inject('APP_CONFIG') private config: AppConfig, private http: Http) {
    this.coursesChanged = new EventEmitter<Course[]>();
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
    if ( attachments !== null ) {
      body.append('attachments', attachments);
    }
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
    ).map(res => res.json());
  }

  addCourse(fd, attachments) {

    let body = new FormData();

    body.append('title', fd.title);
    if ( attachments !== null ) {
      body.append('attachments', attachments);
    }
    body.append('content', fd.content);
    body.append('year', fd.year);
    body.append('semester', fd.semester);

    return this.http.post(
      `${this.config.BASE_URL}api/v1/course/`,
      body,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map(res => res.json());

    // return returnobj;
  }

  deleteCourse(id: string) {
    return this.http.delete(
      `${this.config.BASE_URL}api/v1/course/` + id + `/`,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map(res => res.json());
  }
}
