import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return state.url.startsWith('/dashboard')
        ? true
        : (this.router.navigate(['/']), false);
    } else {
      return state.url.startsWith('/dashboard')
        ? (this.router.navigate(['/']), false)
        : true;
    }
  }
}
