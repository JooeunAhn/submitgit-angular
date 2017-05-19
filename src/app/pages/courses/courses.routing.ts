import { Routes, RouterModule }  from '@angular/router';
import { CoursesComponent } from './courses.component';
import { ModuleWithProviders } from '@angular/core';
import {CourseComponent} from './course/course.component';
import {CourseEditComponent} from './course-edit/course-edit.component';
import {CourseAddComponent} from './course-add/course-add.component';
import {AssignmentsComponent} from './course/assignments/assignments.component';
import {AssignmentAddComponent} from './course/assignments/assignment-add/assignment-add.component';
import {AssignmentComponent} from './course/assignments/assignment/assignment.component';
import {AssignmentEditComponent} from './course/assignments/assignment-edit/assignment-edit.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: 'add',
        component: CourseAddComponent,
      },
      {
        path: ':id',
        component: CourseComponent,
        children: [
          {
            path: 'edit',
            component: CourseEditComponent,
          },
          {
            path: 'assignments',
            component: AssignmentsComponent,
            children: [
              {
                path: 'add',
                component: AssignmentAddComponent,
              },
              {
                path: ':id',
                component: AssignmentComponent,
                children: [
                  {
                    path: 'edit',
                    component: AssignmentEditComponent,
                  },
                ],
              },
            ]
          },
        ],
      },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
