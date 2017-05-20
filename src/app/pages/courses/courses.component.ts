import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from "./course.service";
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  course;
  profile;
  crch: Subscription;
  // isOwner;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
  ) {
    this.crch = this.courseService.coursesChanged.subscribe(data => this.updateCourses(data));
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.course = data;
      },
      (err) => {
        console.log(err);
        this.course = null;
      }
    );

    // get profile info
    this.authService.getProfile().subscribe(
      profile => {
        this.profile = profile;
        // this.isOwner = (this.profile.username == this.course.professor.profile.username ? true : false);
      },
      err => {
        console.log(err);
        this.profile = null;
      }
    );
  }

  updateCourses(courses) {
    this.course = courses;
  }

  courseSearch() {

  }

  ngOnDestroy() {
    this.crch.unsubscribe();
  }
}
