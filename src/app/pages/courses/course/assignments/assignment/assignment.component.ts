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
import {LANG_CHOICES} from '../../../courses.module';

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
  onDownload: boolean = false;
  file;
  codeUrl: string;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    @Inject('APP_CONFIG') private config: AppConfig,
    @Inject('LANG_CHOICES') private LANG_CHOICES,
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
      },
      err => {
        console.log(err);
      }
    );
  }

  updateCourse(course) {
    this.course = course;
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
    activeModal.componentInstance.assignment = this.assignment.submission_set.filter(data => data.student.profile.id == student)[0];
  }

  onDownloadCode() {
    this.onDownload = true;
    window.open(`${this.config.BASE_URL}download_zip/${this.id}`);
  }

  downloadAttachment() {
    window.open(this.course.attachments);
  }

  manualSubmit() {
    this.courseService.manualSubmit(this.id, this.file).subscribe(
      (data) => {
        this.codeUrl = data['code'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  uploadListener(event) {
    if (event.target.files[0]) {
      this.file = event.target.files[0];
    } else {
      this.file = null;
    }
  }

  filterAssignment(item) {
    return this.course.repository_set.filter(data => data.student.profile.id == item.student.profile.id)[0];
  }

  isPassed(item) {
    const assignment = this.assignment.submission_set.filter(data => data.student.profile.id == item.student.profile.id)[0];

    if (assignment == null) {
      return 'Not Submitted';
    } else if (assignment.is_passed) {
      return 'Passed';
    } else {
      return 'Failed';
    }

  }

  ngOnDestroy() {
    this.asch.unsubscribe();
  }
}
