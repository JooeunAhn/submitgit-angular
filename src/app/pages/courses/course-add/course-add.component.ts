import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  courseForm: FormGroup;
  attachmentsChanged = false;
  attachments = null;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.courseForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      // 'attachments': new FormControl(),
      'content': new FormControl('', Validators.required),
      'year': new FormControl('', Validators.required),
      'semester': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    // if (authenticated && doesnotexist) {
      this.courseService.addCourse(this.courseForm.value, this.attachments);
    // }
  }


  fileChange(fileInput: any) {
    this.attachmentsChanged = true;
    this.attachments = fileInput.target.files[0];
  }
}
