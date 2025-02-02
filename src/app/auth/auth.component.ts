import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  submitted = false;
  isRegisterPage: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get username() { return this.registerForm.get('username'); }
  get regEmail() { return this.registerForm.get('email'); }
  get regPassword() { return this.registerForm.get('password'); }

  async onSubmit() {
    this.submitted = true;
    if (this.isRegisterPage) {
      console.log('rrrrrr')

      if (this.registerForm.valid) {
        try {
          await this.authService.register(
            this.registerForm.value.username,
            this.registerForm.value.email,
            this.registerForm.value.password
          );
          alert('Регистрация успешна!');
        } catch (error: any) {
          alert('Ошибка регистрации: ' + error.message);
        }
      }
    } else {
      console.log('lllllll')
      if (this.loginForm.valid) {
        try {
          await this.authService.login(
            this.loginForm.value.email,
            this.loginForm.value.password
          );
          alert('Вход успешен!');
        } catch (error: any) {
          alert('Ошибка входа: ' + error.message);
        }
      }
    }
  }

  toggleAuthPage() {
    this.isRegisterPage = !this.isRegisterPage;
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) return 'Email обязателен';
    if (this.email?.hasError('email')) return 'Некорректный email';
    return '';
  }

  getPassErrorMessage(): string {
    if (this.password?.hasError('required')) return 'Пароль обязателен';
    if (this.password?.hasError('minlength')) return 'Пароль должен содержать минимум 6 символов';
    return '';
  }
}
