import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularfireService } from './angularfire.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {
  public allowed: boolean;

  constructor(private afService: AngularfireService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.afService.af.auth.map((auth) => {
      if (auth === null) {
        this.router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    }).first();
  }
}
