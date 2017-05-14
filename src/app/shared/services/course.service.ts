import {Inject, Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {Http, Headers, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Course} from '../../pages/courses/courses.component';


@Injectable()
export class CourseService {
  constructor(@Inject ('APP_CONFIG') private config: AppConfig, private http: Http, private router: Router) { }

  create_course(fd: Course): Observable<Response> {
    return this.http.post(
      // TODO course 만드는 api 만들기
      `${this.config.BASE_URL}api/v1/course/`,
      JSON.stringify(fd),
      { headers: new Headers({ 'Content-Type': 'application/json' }) }
    ).map(res => res.json());
  }

  delete_course() {
    return this.http.delete(
      // TODO course 삭제하는 api 만들기
      `${this.config.BASE_URL}api/v1/course`,
      { headers: new Headers({ 'Content-Type': 'application/json' }) }
    ).map(res => res.json());
  }

  update_course(fd: Course) {
    return this.http.put(
      // TODO course 수정하는 api 만들기
      `${this.config.BASE_URL}api/v1/course`,
      JSON.stringify(fd),
      { headers: new Headers({ 'Content-Type': 'application/json' }) }
    ).map(res => res.json());
  }

  get_course(id: string) {
    return this.http.get(
      // TODO course 조회하는 api 만들기
      `${this.config.BASE_URL}api/v1/course/` + id,
      { headers: new Headers({ 'Content-Type': 'application/json' }) }
    ).map(res => res.json());
  }
}
