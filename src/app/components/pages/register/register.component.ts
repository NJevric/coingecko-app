import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(this.getFormElements());
  }

  ngOnInit(): void {
  }

  getFormElements(): Object {
    return {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
  }

  signUp() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.loading = true;

      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      this.authService.signUp(email, password).subscribe((response: any) => {
        console.log(response);
        this.loading = false;
        this.error = '';
        this.registerForm.reset();
        this.router.navigate(['/home']);
      }, errorMessage => {
        this.error = errorMessage
        this.loading = false;
        this.registerForm.reset();
      }
      );
    }
  }

}
