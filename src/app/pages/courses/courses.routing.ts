import { Routes, RouterModule }  from '@angular/router';

import { CoursesComponent } from './courses.component';
import { ModuleWithProviders } from '@angular/core';
import {CourseComponent} from './course/course.component';
import {CourseEditComponent} from './course-edit/course-edit.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: ':id',
        component: CourseComponent,
        children: [
          {
            path: 'edit',
            component: CourseEditComponent,
          }
        ]
      },
      {
        path: 'add',
        component: CourseEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
