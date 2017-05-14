import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared/services/course.service';
import {Router} from '@angular/router';
import {Serializable} from '../../shared/serializable';


export class Repository extends Serializable {
  student: string;
  course: string;
  isVerified: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export class Course extends Serializable {
  professor: string;
  students: string;
  title: string;
  content: string;
  semester: string;
  attachment: string;
  createdAt: string;
  updatedAt: string;
}


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  course: Course[];
  result;

  constructor(private courseService: CourseService, private router: Router) {
    this.result = this.courseService.get_course();
    console.log(this.result.subscribe(
      (data) => {
        console.log(data);
      }
    ))
  }

  ngOnInit() { }

}
