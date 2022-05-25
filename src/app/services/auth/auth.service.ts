import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { AuthResponseData } from 'src/app/entities/AuthResponseData';
import { User } from 'src/app/user.model';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  loggedIn = false;
  errorMessage: string = '';
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient) { }

  isAuthenticated(): any {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn)
      }, 0)
    })
    return promise;
  }

  login(email: string, password: string) {
    this.loggedIn = true;
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAxcXPEfLiSZEd6WOJKjmisHiJS3saNIw', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError((errorRes: any) => {
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(this.errorMessage);
      }
      this.errorMessage = errorRes.error.error.message;
      return throwError(this.errorMessage);
    }),
      tap((responseData: any) => {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate)
        this.user.next(user);
        // localStorage.setItem('loggedIn','1');
        this.setLocalStorage('1');
        console.log(user);
        localStorage.setItem('userData', JSON.stringify(user))
      }))

  }


  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAxcXPEfLiSZEd6WOJKjmisHiJS3saNIw', {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
      catchError((errorRes: any) => {
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(this.errorMessage);
        }
        this.errorMessage = errorRes.error.error.message;
        return throwError(this.errorMessage);
      }),
      tap((responseData: any) => {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate)
        this.user.next(user);
        this.setLocalStorage('1');
        localStorage.setItem('userData', JSON.stringify(user))
        this.autoLogout(responseData.expiresIn * 1000)
        // this.autoLogout(2000);
      })
    );
  }

  logout() {
    this.loggedIn = false;
    this.user.next(null!);
    localStorage.removeItem('userData');
    // localStorage.setItem('loggedIn','0');
    // this.setLocalStorage('0');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  getLocalStorage() {
    return localStorage.getItem('loggedIn');
  }
  setLocalStorage(val: string) {
    localStorage.setItem('loggedIn', val)
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')!)
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }
}
