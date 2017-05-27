import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../../shared/services/auth.service';
import {CourseService} from '../../../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../assignment.model';
import {Course} from '../../../course.model';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';

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

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
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
    this.courseService.manualGrade(this.id, this.profile.username).subscribe(
      data => {
        const _assignment: Assignment = data;
        this.courseService.assignmentChanged.emit(_assignment);
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

  ngOnDestroy() {
    this.asch.unsubscribe();
  }
}
