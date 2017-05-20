import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {Course} from '../course.model';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  courseForm: FormGroup;
  attachmentsChanged = false;
  attachments = null;
  profile;
  courses;

  // TODO SEMESTER, LANG_CHOICE는 서비스에 injectable로 만들기
  SEMESTER = [
    { 'value' : 0, 'name' : '1학기' },
    { 'value' : 1, 'name' : '여름 계절학기' },
    { 'value' : 2, 'name' : '2학기' },
    { 'value' : 3, 'name' : '겨울 계절학기' },
  ];

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.initForm();

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
      'title': new FormControl('', Validators.required),
      'attachments': new FormControl(),
      'content': new FormControl('', Validators.required),
      'year': new FormControl('', Validators.required),
      'semester': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.profile.is_prof) {
      this.courseService.addCourse(this.courseForm.value, this.attachments).subscribe(
        data => {
          this.courseService.getCourses().subscribe(
            courses => {
              const _courses: Course[] = courses;
              this.courseService.coursesChanged.emit(_courses);
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

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  fileChange(fileInput: any) {
    this.attachmentsChanged = true;
    this.attachments = fileInput.target.files[0];
  }
}
