import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from "./course.service";


// export class Repository extends Serializable {
//   student: string;
//   course: string;
//   isVerified: string;
//   url: string;
//   createdAt: string;
//   updatedAt: string;
// }
//
// export class Course extends Serializable {
//   professor: string;
//   students: string;
//   title: string;
//   content: string;
//   semester: string;
//   attachment: string;
//   createdAt: string;
//   updatedAt: string;
// }
//

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  data;

  constructor(private router: Router, private courseService: CourseService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.data = data;
      },
      (err) => {
        console.log(err);
        this.data = null;
      }
    );
  }

  courseSearch(){

  }
}
