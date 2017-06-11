import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../../shared/services/auth.service';
import {CourseService} from '../../../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../../course.model';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {

  id: string;
  courseid: string;
  course: Course;
  assignment;
  assignmentForm: FormGroup;
  attachmentsChanged: boolean = false;
  profile;

  constructor(
    @Inject('LANG_CHOICES') private LANG_CHOICES,
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      data => {
        this.id = data['id'];
        this.courseService.getAssignment(this.id).subscribe(
          assignment => {
            this.assignment = assignment;
            this.initForm();
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

    this.route.parent.parent.parent.params.subscribe(
      data => {
        this.courseid = data['id'];
        this.courseService.getCourse(this.courseid).subscribe(
          course => {
            this.course = course;
          }
        );
      },
      err => {
        console.log(err);
      }
    );

    this.authService.getProfile().subscribe(
      data => {
        this.profile = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  initForm() {
    const _splitted = this.assignment.test_langids.split(',');
    let formArr = [];

    this.LANG_CHOICES.forEach(function (val, idx) {
      if (_splitted.includes(idx.toString())) {
        formArr.push(new FormControl(true));
      } else {
        formArr.push(new FormControl(false));
      }
    });

    // this.LANG_CHOICES.forEach(function (val, idx) {
    //   if (_splitted.includes(idx.toString())) {
    //     val.checked = 'true';
    //   } else {
    //     val.checked = 'false';
    //   }
    // });

    const checkboxArr = new FormArray(formArr);

    this.assignmentForm = new FormGroup({
      // 'course': new FormControl(this.course.title, Validators.required),
      'title': new FormControl(this.assignment.title, Validators.required),
      'content': new FormControl(this.assignment.content, Validators.required),
      'is_test': new FormControl(this.assignment.is_test),
      'test_time': new FormControl(this.assignment.test_time),
      'deadline': new FormControl(this.assignment.deadline, Validators.required), // 2017-05-19T08:10:09Z
      'test_file_name': new FormControl(this.assignment.test_file_name, Validators.required),
      'test_langids': checkboxArr,
      'attachments': new FormControl(),
      'test_input': new FormControl(this.assignment.test_input),
      'test_output': new FormControl(this.assignment.test_output),
    });
  }

  fileChange(fileInput: any) {
    this.attachmentsChanged = true;
    this.assignment.attachments = fileInput.target.files[0];
  }

  onSubmit() {
    if (
      this.assignment != null
      && this.profile.username == this.course.professor.profile.username
    ) {
      let attachments;
      if (this.attachmentsChanged) {
        attachments = this.assignment.attachments;
      } else {
        attachments = null;
      }
      this.courseService.updateAssignment(this.id, this.assignmentForm.value, attachments, this.courseid).subscribe(
        data => {
          console.log('update completed');
          console.log(data);
          this.courseService.getCourse(this.courseid).subscribe(
            course => {
              const _course: Course = course;
              this.courseService.assignmentsChanged.emit(_course);
            },
            err => {
              console.log(err);
            }
          );

          this.courseService.getAssignment(this.id).subscribe(
            assignment => {
              const _assignment: Assignment = assignment;
              this.courseService.assignmentChanged.emit(_assignment);
            },
            err => {
              console.log(err);
            }
          );

          this.router.navigate(['../'], {relativeTo: this.route});
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
