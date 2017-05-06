import {Injectable, Inject} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { AuthService } from "./auth.service";
import {Http, Headers} from "@angular/http";
import {AppConfig} from "../../app.config";
import {Observable} from "rxjs";

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(private router: Router, private http: Http, @Inject ('APP_CONFIG') private config: AppConfig,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    return this.http.get(
      `${this.config.BASE_URL}api/v1/profile/me/`,
      {headers: new Headers({
        'Content-Type': "application/json",
        "Authorization": `Token ${localStorage.getItem('auth_token')}`})}
    ).map(res=>{
      let data = res.json();
      if(Object.keys(data).length == 0){
        this.router.navigate(['/profile', 'add']);
      }
      return true;
    })
  }
}
