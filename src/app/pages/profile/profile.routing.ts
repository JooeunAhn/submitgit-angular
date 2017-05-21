import { Routes, RouterModule }  from '@angular/router';

import {ProfileComponent} from "./profile.component";
import {ProfileAddComponent} from "./profile-add/profile-add.component";
import {ProfileViewComponent} from "./profile-view/profile-view.component";
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'add', component: ProfileAddComponent },
      { path: 'edit', component: ProfileEditComponent },
      { path: 'view', component: ProfileViewComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
