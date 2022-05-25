import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAutheticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // console.log(localStorage.getItem('loggedIn'))
    this.userSub = this.authService.user.subscribe((user: any) => {
      console.log('aaaaaa');
      console.log(user);
      this.isAutheticated  = user ? true : false
      console.log(this.isAutheticated);
    })
    // console.log(this.authService.getLocalStorage())
    // this.isAutheticated ? this.authService.getLocalStorage() == 1 : this.authService.getLocalStorage() == 0
    // console.log(this.isAutheticated);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    // console.log(localStorage.getItem('loggedIn'))
    // this.router.navigate(['/']);
  }

  getLs(){
    return this.authService.getLocalStorage();
  }
}
