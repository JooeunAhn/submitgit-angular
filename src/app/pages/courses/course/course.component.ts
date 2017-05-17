import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  data;
  id: string;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.data = this.courseService.getCourse(this.id).subscribe(
        (data) => {
          this.data = data;
        },
        (err) => {
          console.log(err);
          this.data = null;
        }
      );
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete the course and related assignments?')) {
      this.courseService.deleteCourse(this.id).subscribe(
        (data) => {
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
