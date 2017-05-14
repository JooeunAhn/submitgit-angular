import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  data: object;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses()
      .mergeMap(val => val)
      .filter(data => data.id === 3)
  }

}
