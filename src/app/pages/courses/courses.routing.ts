import { Routes, RouterModule }  from '@angular/router';

import { CoursesComponent } from './courses.component';
import { ModuleWithProviders } from '@angular/core';
import {CourseComponent} from './course/course.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: ':id',
        component: CourseComponent,
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
