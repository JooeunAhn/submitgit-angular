import { Routes, RouterModule }  from '@angular/router';

import { CoursesComponent } from './courses.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
