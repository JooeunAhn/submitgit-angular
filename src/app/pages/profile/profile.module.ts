import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile.component';
import {routing} from "./profile.routing";

@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [ProfileAddComponent, ProfileViewComponent, ProfileComponent]
})
export class ProfileModule { }
