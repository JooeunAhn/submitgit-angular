import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from "./course.service";
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  course;
  profile;
  // isOwner;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

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

  courseSearch(){

  }
}
