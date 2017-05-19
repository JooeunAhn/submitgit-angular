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

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
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
  ],
  providers: [
    CourseService,
  ]
})
export class CoursesModule {}
