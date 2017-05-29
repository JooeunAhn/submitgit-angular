import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../../shared/services/auth.service';
import {CourseService} from '../../../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../assignment.model';
import {Course} from '../../../course.model';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {AppConfig} from '../../../../../app.config';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit, OnDestroy {

  id: string;
  assignment: Assignment;
  profile;
  course;
  courseid: string;
  asch: Subscription;
  manual: boolean = false;
  @Output() output = new EventEmitter<any>();
  get_profile_b: boolean = false;
  get_course_b: boolean = false;
  is_owner: boolean = false;
  onDownload: boolean = false;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    @Inject('APP_CONFIG') private config: AppConfig,
  ) {
    this.asch = this.courseService.assignmentChanged.subscribe(data => this.updateAssignment(data));
  }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.id = data['id'];
        this.courseService.getAssignment(this.id).subscribe(
          assignment => {
            this.assignment = assignment;
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

    this.route.parent.parent.params.subscribe(
      data => {
        this.courseid = data['id'];
        this.courseService.getCourse(this.courseid).subscribe(
          course => {
            this.course = course;
            this.get_course_b = true;
            this.output.emit(this.verifyOwner());
          }
        );
      },
      err => {
        console.log(err);
      }
    )

    this.authService.getProfile().subscribe(
      data => {
        this.profile = data;
        this.get_profile_b = true;
        this.output.emit(this.verifyOwner());
      },
      err => {
        console.log(err);
      }
    );
  }

  verifyOwner() {
    if (this.get_course_b && this.get_profile_b) {
      if (this.profile.username == this.course.professor.profile.username) {
        this.is_owner = true;
      }
    }
  }

  updateCourse(course) {
    this.course = course;
  }

  verifyStudent(id) {
    if (confirm('승인하시겠습니까?')) {
      this.courseService.updateRepo(id, this.courseid, this.course.repository_set.filter(obj => obj.id == id)[0].url).subscribe(
        data => {
          this.courseService.getCourse(this.courseid).subscribe(
            course => {
              this.output.emit(this.updateCourse(course));
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

  onDelete() {
    if (confirm(`Are you sure you want to delete this assignment ${this.assignment.title}?`)) {
      this.courseService.deleteAssignment(this.id).subscribe(
        data => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.courseService.getCourse(this.id).subscribe(
            course => {
              const _course: Course = course;
              this.courseService.assignmentsChanged.emit(_course);
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

  updateAssignment(assignment) {
    this.assignment = assignment;
  }

  manualGrade() {
    this.manual = true;
    this.courseService.manualGrade(this.id, this.profile.username).subscribe(
      data => {
        const _assignment: Assignment = data;
        this.courseService.assignmentChanged.emit(_assignment);
        this.manual = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  lgModalShow(student) {
    const activeModal = this.modalService.open(ModalComponent, {size: 'sm'});
    activeModal.componentInstance.modalHeader = '';
    activeModal.componentInstance.student_id = student;
    activeModal.componentInstance.assignment = this.assignment.submission_set.filter(data => data.student == student);
  }

  onDownloadCode() {
    this.onDownload = true;
    window.open(`${this.config.BASE_URL}download_zip/${this.id}`);
  }

  downloadAttachment() {
    window.open(this.course.attachments);
  }

  ngOnDestroy() {
    this.asch.unsubscribe();
  }
}
