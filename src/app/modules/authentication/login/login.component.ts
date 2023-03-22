import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({});
  visiblePassword = false;
  submitted = false;
  passwordToText = 'password';
  error = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (
      this.authService.currentUserValue &&
      this.authService.currentUserValue?.token
    ) {
      this.router.navigateByUrl(this.authService.goToUserDefaultPage());
    }
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required],
    });
  }

  changePasswordVisibility() {
    this.visiblePassword = !this.visiblePassword;
    this.passwordToText =
      this.passwordToText === 'password' ? 'text' : 'password';
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.form?.invalid) {
      this.error = 'Email and Password not valid !';
      return;
    } else {
      let formData = this.form?.getRawValue();
      this.authService.login(formData.email, formData.password).subscribe(
        (res) => {
          if (res) {
            const token = this.authService.currentUserValue.token;
            if (token) {
              const redirect = localStorage.getItem('redirectTo');
              console.log('redirect =>>>', redirect);

              if (redirect) {
                localStorage.removeItem('redirectTo');
                this.router.navigate([redirect]);
              } else {
                this.router.navigateByUrl(
                  this.authService.goToUserDefaultPage()
                );
              }
            }
          } else {
            this.error = 'Invalid Login';
          }
        },
        (error) => {
          this.error = ' Please, Check Email And Password And Try Again!';
          this.submitted = false;
        }
      );
    }
  }
}
