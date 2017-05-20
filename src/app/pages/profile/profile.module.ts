import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile.component';
import {routing} from "./profile.routing";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import {ProfileService} from './profile.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AppTranslationModule} from '../../app.translation.module';
import {NgaModule} from '../../theme/nga.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [ProfileAddComponent, ProfileViewComponent, ProfileComponent, ProfileEditComponent],
  providers: [
    ProfileService,
  ]
})
export class ProfileModule { }
