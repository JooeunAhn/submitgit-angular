import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  profile;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      data => {
        this.profile = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
