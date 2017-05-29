import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {Course} from '../course.model';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {

  course: Course;
  repo;
  profile;
  id: string;
  asch: Subscription;
  isRegister: boolean = false;
  registerForm: FormGroup;
  alreadyRegistered: boolean = true;
  @Output() output = new EventEmitter<any>();
  get_repo_b: boolean = false;
  get_course_b: boolean = false;
  // isOwner: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.asch = this.courseService.assignmentsChanged.subscribe(data => this.updateCourse(data));
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'url': new FormControl('', Validators.required),
    });

    // course data subscribe
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        this.courseService.getRepo(this.id).subscribe(
          data => {
            this.repo = data;
            this.get_repo_b = true;
            this.output.emit(this.checkRegister());
          },
          err => {
            console.log(err);
          }
        );

        this.courseService.getCourse(this.id).subscribe(
          (data) => {
            this.course = data;
            this.get_course_b = true;
            this.output.emit(this.checkRegister());
          },
          (err) => {
            console.log(err);
            this.course = null;
          }
        );
      }
    );

    // get profile info
    this.authService.getProfile().subscribe(
      profile => {
        this.profile = profile;
        // this.isOwner = (this.profile.username == this.course.professor.profile.username ? true : false);
      },
      err => {
        console.log(err);
        this.profile = null;
      }
    );
  }

  onDelete() {
    if (confirm('Are you sure you want to delete the course and related assignments?')
      && this.profile.username == this.course.professor.profile.username
      && this.course != null
    ) {
      this.courseService.deleteCourse(this.id).subscribe(
        (data) => {
          this.courseService.getCourses().subscribe(
            courses => {
              const _courses: Course[] = courses;
              this.courseService.coursesChanged.emit(_courses);
            },
            err => {
              console.log(err);
            }
          );
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  updateCourse(course) {
    this.course = course;
  }

  onRegister() {
    this.courseService.addRepo(this.registerForm.value, this.id).subscribe(
      data => {
        // this.onCancel();
      },
      err => {
        console.log(err);
      }
    );
  }

  onCancel() {

  }

  checkRegister() {
    if (this.get_course_b && this.get_repo_b) {
      if (this.repo == null) {
        this.alreadyRegistered = false;
      }
    }
  }


  showRegister() {
    this.isRegister = true;
  }

  downloadAttachment() {
    window.open(this.course.attachments);
  }

  ngOnDestroy() {
    this.asch.unsubscribe();
  }
}
