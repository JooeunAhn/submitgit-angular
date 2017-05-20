import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../../shared/services/auth.service';
import {CourseService} from '../../../course.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Course} from '../../../course.model';
import 'ng2-datetime/node_modules/bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'bootstrap-timepicker/css/bootstrap-timepicker.min.css';
import 'bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
  selector: 'app-assignment-add',
  templateUrl: './assignment-add.component.html',
  styleUrls: ['./assignment-add.component.scss']
})
export class AssignmentAddComponent implements OnInit {

  profile;
  assignmentForm: FormGroup;
  attachments;
  attachmentsChanged;
  courses: Course[];
  course: Course;
  id: string;

  constructor(@Inject('LANG_CHOICES') private LANG_CHOICES, private authService: AuthService, private courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.courseService.getCourses().subscribe(
          (data: Course[]) => {
            this.courses = data;
          },
          (err) => {
            this.courses = null;
            console.log(err);
          }
        );
        this.courseService.getCourse(this.id).subscribe(
          (data: Course) => {
            this.course = data;
            this.initForm();
          },
          (err) => {
            this.course = null;
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );

    // get profile info
    this.authService.getProfile().subscribe(
      profile => {
        this.profile = profile;
      },
      err => {
        console.log(err);
        this.profile = null;
      }
    );
  }

  initForm() {
    let formArr = [];

    this.LANG_CHOICES.forEach(function (val) {
      formArr.push(new FormControl(false));
    });

    const checkboxArr = new FormArray(formArr);

    this.assignmentForm = new FormGroup({
      // 'course': new FormControl(this.course.title, Validators.required),
      'title': new FormControl('', Validators.required),
      'content': new FormControl('', Validators.required),
      'is_test': new FormControl(false),
      'deadline': new FormControl('', Validators.required), // 2017-05-19T08:10:09Z
      'test_file_name': new FormControl('', Validators.required),
      'test_langids': checkboxArr,
      'attachments': new FormControl(),
      'test_input': new FormControl(),
      'test_output': new FormControl(),
    });
  }

  onSubmit() {
    if (this.profile.is_prof) {
      this.courseService.addAssignment(this.assignmentForm.value, this.attachments, this.id).subscribe(
        data => {
          this.courseService.getCourse(this.id).subscribe(
            course => {
              const _course: Course = course;
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

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  fileChange(fileInput: any) {
    this.attachmentsChanged = true;
    this.attachments = fileInput.target.files[0];
  }

}
