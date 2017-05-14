import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {routing} from "./courses.routing";
import {CoursesComponent} from "./courses.component";
import {CourseService} from "./course.service";
import { CourseComponent } from './course/course.component';
import { CourseAddComponent } from './course-add/course-add.component';
import {ActivatedRouteSnapshot} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseAddComponent,
  ],
  providers: [
    CourseService,
  ]
})
export class CoursesModule {}
