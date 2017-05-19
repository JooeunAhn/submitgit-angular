import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../shared/services/auth.service';
import {CourseService} from '../../../course.service';
import {ActivatedRoute} from '@angular/router';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  id: string;
  assignment: Assignment;

  constructor(private authService: AuthService, private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.id = data['id'];
        this.courseService.getAssignment(this.id).subscribe(
          assignment => {
            this.assignment = assignment;
            console.log(assignment);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

}
