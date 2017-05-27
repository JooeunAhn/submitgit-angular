import {Component, OnDestroy, OnInit} from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import {CourseService} from './courses/course.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com" translate>{{'general.akveo'}}</a> 2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements OnInit, OnDestroy {

  _menuChanged: Subscription;

  constructor(private _menuService: BaMenuService, private courseService: CourseService) {
    this._menuChanged = this._menuService._menuChanged.subscribe(data => this._menuService.updateMenuByRoutes(<Routes>data));
  }

  ngOnInit() {
    this.courseService.getMyCourses().subscribe(
      data => {
        data.forEach(item => {
          let child = {
            path: item.id,
            data: {
              menu: {
                title: item.title,
              }
            }
          };
          PAGES_MENU['0']['children']['1']['children'].push(child);
        });
        this._menuService._menuChanged.emit(<Routes>PAGES_MENU);
      },
      err => {
        console.log(err);
      }
    );

    this.courseService.getAssignments().subscribe(
      data => {
        data.forEach(item => {
          let child = {
            path: ['courses', item.course, 'assignments', item.id],
            data: {
              menu: {
                title: item.title,
              }
            }
          };
          PAGES_MENU['0']['children']['2']['children'].push(child);
        });
        this._menuService._menuChanged.emit(<Routes>PAGES_MENU);
      },
      err => {
        console.log(err);
      }
    );

  }

  ngOnDestroy() {
    this._menuChanged.unsubscribe();
  }
}
