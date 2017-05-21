import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile.component';
import {routing} from "./profile.routing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
  ],
  declarations: [ProfileAddComponent, ProfileViewComponent, ProfileComponent]
})
export class ProfileModule { }
