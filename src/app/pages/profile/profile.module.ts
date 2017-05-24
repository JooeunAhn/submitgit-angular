import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {routing} from './profile.routing';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile.component';
import {routing} from "./profile.routing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {NgbDropdownModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from './profile-add/modal/modal.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ProfileService} from './profile.service';

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
    ProfileAddComponent,
    ProfileViewComponent,
    ProfileComponent,
    ProfileEditComponent,
  ],
  declarations: [ProfileAddComponent, ProfileViewComponent, ProfileComponent, ModalComponent]
})
export class ProfileModule { }
