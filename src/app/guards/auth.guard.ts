import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.isAuthenticated()
    //   .then((authenticated: any) => {
    //     if (authenticated) {
    //       return true;
    //     }
    //     else {
    //       this.router.navigate(['/']);
    //       return false;
    //     }
    //   })
    return this.authService.user.pipe(map(user => {
      const isAuth = !!user;
      if(isAuth){
        return true;
      }else{
         this.router.navigate(['/']);
         return false;
      }

    }))
    // , tap((isAuth:any) => {
    //   if(!isAuth) {
    //     this.router.navigate(['/']);
    //   }
    // }))
  }

}
