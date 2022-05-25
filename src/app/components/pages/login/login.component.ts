import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/entities/login';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  users: Array<Login> = [];
  error:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group(this.getFormElements());

    this.users = this.loginService.getUsers();

  }

  ngOnInit(): void {
  }

  getFormElements(): Object {
    return {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email,password).subscribe((responseData:any)=>{
        console.log(responseData);
        this.router.navigate(['/home']);
      },errorMessage => {
        this.error = errorMessage;
      })

    }
  }
}
