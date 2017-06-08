import {Component, Inject, OnInit} from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../course.model';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  id: string;
  course;
  courseForm: FormGroup;
  attachmentsChanged: boolean = false;
  profile;

  constructor(@Inject('SEMESTER') private SEMESTER, private courseService: CourseService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.courseService.getCourse(this.id).subscribe(
        (data) => {
          this.course = data;
          this.initForm();
        },
        (err) => {
          console.log(err);
          this.course = null;
        }
      );
    });

    // get profile info
    this.authService.getProfile().subscribe(
      profile => {
        this.profile = profile;
        // this.isOwner = (this.profile.username == this.data.professor.profile.username ? true : false);
      },
      err => {
        console.log(err);
        this.profile = null;
      }
    );
  }

  initForm() {
    this.courseForm = new FormGroup({
      'title': new FormControl(this.course.title, Validators.required),
      'attachments': new FormControl(),
      'content': new FormControl(this.course.content, Validators.required),
      'year': new FormControl(this.course.year, Validators.required),
      'semester': new FormControl(this.course.semester, Validators.required),
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  fileChange(fileInput: any) {
    this.attachmentsChanged = true;
    this.course.attachments = fileInput.target.files[0];
  }

  onSubmit() {
    if (
      this.course != null
      && this.profile.username == this.course.professor.profile.username
    ) {
      let attachments;
      if (this.attachmentsChanged) {
        attachments = this.course.attachments;
      } else {
        attachments = null;
      }
      this.courseService.updateCourse(this.id, this.courseForm.value, attachments).subscribe(
        data => {
          this.courseService.getCourse(this.id).subscribe(
            courses => {
              const _course: Course = courses;
              this.courseService.assignmentsChanged.emit(_course);
            },
            err => {
              console.log(err);
            }
          );
          this.onCancel();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
