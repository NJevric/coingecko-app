import { Injectable } from '@angular/core';
import { Login } from 'src/app/entities/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: Array<Login> = [
    {
      email: 'nikola@gmail.com',
      password: 1234
    },
    {
      email: 'maca@gmail.com',
      password: 1234
    }
  ]
  constructor() { }

  getUsers(): Array<Login> {
    return this.users;
  }
}
