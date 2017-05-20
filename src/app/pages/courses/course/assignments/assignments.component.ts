import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../course.service';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  constructor(private courseService: CourseService, private authService: AuthService) { }

  ngOnInit() {
  }

}
