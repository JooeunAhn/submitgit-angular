import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {routing} from "./courses.routing";
import {CoursesComponent} from "./courses.component";
import {CourseService} from "./course.service";

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
  ],
  providers: [
    CourseService,
  ]
})
export class CoursesModule {}
