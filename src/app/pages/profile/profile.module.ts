import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {routing} from './profile.routing';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile.component';
import {NgbDropdownModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from './profile-add/modal/modal.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    NgbDropdownModule,
    NgbModalModule,
  ],
  entryComponents: [
    ModalComponent,
  ],
  declarations: [ProfileAddComponent, ProfileViewComponent, ProfileEditComponent, ProfileComponent, ModalComponent]
})
export class ProfileModule { }
