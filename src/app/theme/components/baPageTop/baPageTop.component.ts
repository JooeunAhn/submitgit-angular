import {Component, OnInit} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  public username: string = "";

  ngOnInit(){
    this.authService.getProfile().subscribe(
      (data) => {
        this.username = data['username'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  constructor(private _state:GlobalState, private authService: AuthService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public logout(): void{
    this.authService.logout();
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
