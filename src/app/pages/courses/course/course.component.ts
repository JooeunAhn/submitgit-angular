import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {Course} from '../course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course;
  profile;
  id: string;
  // isOwner: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // course data subscribe
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.courseService.getCourse(this.id).subscribe(
          (data) => {
            this.course = data;
          },
          (err) => {
            console.log(err);
            this.course = null;
          }
        );
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

  onDelete() {
    if (confirm('Are you sure you want to delete the course and related assignments?')
      && this.profile.username == this.course.professor.profile.username
      && this.course != null
    ) {
      this.courseService.deleteCourse(this.id).subscribe(
        (data) => {
          this.courseService.getCourses().subscribe(
            courses => {
              const _courses: Course[] = courses;
              this.courseService.coursesChanged.emit(_courses);
            },
            err => {
              console.log(err);
            }
          );
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
