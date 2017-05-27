import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import {routing} from "./courses.routing";
import {CoursesComponent} from "./courses.component";
import {CourseService} from "./course.service";
import { CourseComponent } from './course/course.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { AssignmentsComponent } from './course/assignments/assignments.component';
import { AssignmentComponent } from './course/assignments/assignment/assignment.component';
import { AssignmentAddComponent } from './course/assignments/assignment-add/assignment-add.component';
import { AssignmentEditComponent } from './course/assignments/assignment-edit/assignment-edit.component';
import {ModalComponent} from './course/assignments/assignment/modal/modal.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

export const SEMESTER = [
  { 'value' : 0, 'name' : '1학기' },
  { 'value' : 1, 'name' : '여름 계절학기' },
  { 'value' : 2, 'name' : '2학기' },
  { 'value' : 3, 'name' : '겨울 계절학기' },
];

export const LANG_CHOICES = [
  { 'value': 0, 'name': 'Python' },
  { 'value': 1, 'name': 'Ruby' },
  { 'value': 2, 'name': 'Clojure' },
  { 'value': 3, 'name': 'PHP' },
  { 'value': 4, 'name': 'Javascript' },
  { 'value': 5, 'name': 'Scala' },
  { 'value': 6, 'name': 'Go' },
  { 'value': 7, 'name': 'C' },
  { 'value': 8, 'name': 'Java' },
  { 'value': 9, 'name': 'VB.NET' },
  { 'value': 10, 'name': 'C#' },
  { 'value': 11, 'name': 'Bash' },
  { 'value': 12, 'name': 'Objective-C' },
  { 'value': 13, 'name': 'MySQL' },
  { 'value': 14, 'name': 'Perl' },
  { 'value': 15, 'name': 'C++' },
];

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    NgbModalModule,
    Ng2DatetimePickerModule,
    routing,
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseEditComponent,
    CourseAddComponent,
    AssignmentsComponent,
    AssignmentComponent,
    AssignmentAddComponent,
    AssignmentEditComponent,
    ModalComponent,
  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    CourseService,
    {provide: 'SEMESTER', useValue: SEMESTER},
    {provide: 'LANG_CHOICES', useValue: LANG_CHOICES}
  ]
})
export class CoursesModule {}
