import {EventEmitter, Inject, Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, Response} from '@angular/http';
import {Course} from './course.model';
import {Assignment} from './course/assignments/assignment.model';


@Injectable()
export class CourseService {

  public coursesChanged: EventEmitter<Course[]>;
  public assignmentsChanged: EventEmitter<Course>;
  public assignmentChanged: EventEmitter<Assignment>;

  constructor(@Inject('APP_CONFIG') private config: AppConfig, private http: Http) {
    this.coursesChanged = new EventEmitter<Course[]>();
    this.assignmentsChanged = new EventEmitter<Course>();
    this.assignmentChanged = new EventEmitter<Assignment>();
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

  getMyCourses(): Observable<Course[]> {
    return this.http.get(`${this.config.BASE_URL}api/v1/course/me/`,
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
      `${this.config.BASE_URL}api/v1/course/${id}/`,
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
      `${this.config.BASE_URL}api/v1/course/${id}/`,
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
  }

  deleteCourse(id: string) {
    return this.http.delete(
      `${this.config.BASE_URL}api/v1/course/${id}/`,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map(res => res.json());
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get(
      `${this.config.BASE_URL}api/v1/assignment/me/`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map((res: Response) => <Assignment[]>res.json());
  }

  getAssignment(id: string): Observable<Assignment> {
    return this.http.get(
      `${this.config.BASE_URL}api/v1/assignment/${id}/`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map((res: Response) => <Assignment>res.json());
  }

  // 이거는 그냥 course에 assignment_set으로 들어있음
  // getCourseAssignments(): Observable<Assignment[]> {
  //   return this.http.get(
  //     `${this.config.BASE_URL}api/v1/assignment`,
  //     {
  //       headers: new Headers({
  //         'Content-Type': 'application/json',
  //         'Authorization': `Token ${localStorage.getItem('auth_token')}`
  //       })
  //     },
  //   ).map((res: Response) => <Assignment[]>res.json());
  // }


  addAssignment(fd, attachments, courseid) {
    let body = new FormData();
    let test_langids = '';

    fd.test_langids.forEach(function (val, idx) {
      if (val == true) {
        test_langids += idx + ',';
      }
    });

    body.append('title', fd.title);
    body.append('course', courseid);
    body.append('content', fd.content);
    body.append('test_file_name', fd.test_file_name);
    body.append('deadline', fd.deadline);
    if (attachments != null) {
      body.append('attachments', attachments);
    }
    body.append('test_langids', test_langids.substr(0, test_langids.length - 1));
    body.append('test_time', fd.test_time);
    body.append('is_test', fd.is_test);
    if (fd.is_test) {
      body.append('test_input', fd.test_input);
      body.append('test_output', fd.test_output);
    } else {
      body.append('test_input', '');
      body.append('test_output', '');
    }

    return this.http.post(
      `${this.config.BASE_URL}api/v1/assignment/`,
      body,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map(res => res.json());
  }

  deleteAssignment(id: string) {
    return this.http.delete(
      `${this.config.BASE_URL}api/v1/assignment/${id}/`,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map(res => res.json());
  }

  updateAssignment(id: string, fd, attachments, courseid) {
    let body = new FormData();
    let test_langids = '';

    fd.test_langids.forEach(function (val, idx) {
      if (val == true) {
        test_langids += idx + ',';
      }
    });

    body.append('title', fd.title);
    body.append('course', courseid);
    body.append('content', fd.content);
    body.append('deadline', fd.deadline);
    body.append('test_file_name', fd.test_file_name);
    if (attachments != null) {
      body.append('attachments', attachments);
    }
    body.append('test_langids', test_langids.substr(0, test_langids.length - 1));
    body.append('is_test', fd.is_test);
    if (fd.is_test) {
      body.append('test_input', fd.test_input);
      body.append('test_output', fd.test_output);
    } else {
      body.append('test_input', '');
      body.append('test_output', '');
    }

    return this.http.put(
      `${this.config.BASE_URL}api/v1/assignment/${id}/`,
      body,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    ).map(res => res.json());
  }

  searchCourses(searchInput) {
    return this.http.get(
      `${this.config.BASE_URL}api/v1/course/?keyword=${searchInput}`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      }
    ).map((res: Response) => res.json());
  }

  manualGrade(id: string, username: string) {
    return this.http.get(
      `${this.config.BASE_URL}manual/${id}/?username=${username}`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      }
    );
  }

  getRepo(id) {
    return this.http.get(
      `${this.config.BASE_URL}api/v1/repo/course/?course_id=${id}`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      }
    ).map((res: Response) => res.json());
  }

  addRepo(fd, courseid: string, github_username: string) {
    let body = new FormData();

    body.append('is_verified', 'false');
    body.append('course', courseid);
    body.append('url', `https://github.com/${github_username}/${fd.url}/`);

    return this.http.post(
      `${this.config.BASE_URL}api/v1/repo/`,
      body,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    );
  }

  updateRepo(repoid: string, courseid: string, url: string) {
    let body = new FormData();
    body.append('is_verified', 'true');
    body.append('id', repoid);
    body.append('course', courseid);
    body.append('url', url);

    return this.http.put(
      `${this.config.BASE_URL}api/v1/repo/${repoid}/`,
      body,
      {
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        })
      },
    );
  }

  manualSubmit(id: string, file){
    let url = `${this.config.BASE_URL}api/v1/encryptor/`;
    let data = new FormData();
    data.append('code', file);
    data.append('assignment', id);
    return this.http.post(
      url,
      data,
      {
        headers: new Headers({
          "Authorization": `Token ${localStorage.getItem('auth_token')}`
        })
      }).map(res => res.json());
  }
}
