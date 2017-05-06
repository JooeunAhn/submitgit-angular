import { Routes, RouterModule }  from '@angular/router';

import {ProfileComponent} from "./profile.component";
import {ProfileAddComponent} from "./profile-add/profile-add.component";
import {ProfileViewComponent} from "./profile-view/profile-view.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'add', component: ProfileAddComponent },
      { path: 'view', component: ProfileViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
