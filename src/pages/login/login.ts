import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { fadeInAnimation } from '../../app/animations/page-animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Header, Footer],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  animations: [fadeInAnimation]
})
export class Login implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authStateSubscription?: Subscription;

  isLoginMode = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showResendVerification = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor() {
    // Add custom validator for password confirmation
    this.signupForm.addValidators(this.passwordMatchValidator);
    
    // Check Firebase configuration on init
    this.checkFirebaseConfig();
  }

  ngOnInit() {
    // Check for email verification callback
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'verifyEmail' || params['oobCode']) {
        // User is coming back from email verification
        this.isLoginMode = true;
        this.successMessage = 'Email verified successfully! You can now login.';
        // Clear query params
        this.router.navigate([], { queryParams: {} });
      }
    });

    // Listen to auth state changes to detect email verification
    this.authStateSubscription = this.authService.authState$.pipe(
      filter(user => user !== null)
    ).subscribe(user => {
      // If user is verified and we're on signup page, switch to login
      if (user && user.emailVerified && !this.isLoginMode) {
        this.isLoginMode = true;
        this.successMessage = 'Email verified successfully! You can now login.';
        this.isLoading = false; // Reset loading state
        // Only set email, NOT password - password should be empty
        if (user.email) {
          this.loginForm.patchValue({ 
            email: user.email,
            password: '' // Explicitly clear password
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

  private checkFirebaseConfig() {
    // This will be checked when trying to use auth, but we can show a warning
    const env = (window as any).__ENV__ || {};
    if (!env.firebase?.apiKey || env.firebase.apiKey.includes('your-api-key')) {
      console.warn('Firebase may not be configured. Check environment files.');
    }
  }

  passwordMatchValidator = (): { [key: string]: boolean } | null => {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = this.signupForm?.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.showResendVerification = false;
  }

  async onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Prevent multiple submissions
    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (this.isLoading) {
        console.error('Operation timed out');
        this.isLoading = false;
        this.errorMessage = 'Operation timed out. Please try again.';
      }
    }, 30000); // 30 second timeout

    try {
      if (this.isLoginMode) {
        await this.handleLogin();
      } else {
        await this.handleSignup();
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      this.errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
    } finally {
      clearTimeout(timeoutId);
      this.isLoading = false;
    }
  }

  private async handleLogin() {
    if (!this.loginForm.valid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;
    const result = await this.authService.signIn(email!, password!);
    
    if (result.success) {
      this.successMessage = result.message;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    } else {
      // Set error message - loading will be reset by finally block in onSubmit
      this.errorMessage = result.message;
      this.showResendVerification = result.needsVerification;
    }
  }

  private async handleSignup() {
    if (!this.signupForm.valid || this.signupForm.hasError('passwordMismatch')) {
      if (this.signupForm.hasError('passwordMismatch')) {
        this.errorMessage = 'Passwords do not match.';
      } else {
        this.errorMessage = 'Please fill in all fields correctly.';
      }
      return;
    }

    const { email, password } = this.signupForm.value;
    const result = await this.authService.signUp(email!, password!);
    
    if (result.success) {
      this.successMessage = result.message;
      this.showResendVerification = true;
      // Clear the signup form
      this.signupForm.reset();
      // Switch to login mode immediately after successful signup
      this.isLoginMode = true;
      // Only set email, NOT password - password should be empty
      if (email) {
        this.loginForm.patchValue({ 
          email: email,
          password: '' // Explicitly clear password
        });
      } else {
        // Clear both fields if no email
        this.loginForm.patchValue({ 
          email: '',
          password: ''
        });
      }
    } else {
      // Set error message - loading will be reset by finally block in onSubmit
      this.errorMessage = result.message;
    }
  }

  async resendVerification() {
    this.isLoading = true;
    this.errorMessage = '';
    const result = await this.authService.resendVerificationEmail();
    
    if (result.success) {
      this.successMessage = result.message;
    } else {
      this.errorMessage = result.message;
    }
    this.isLoading = false;
  }

  async resetPassword() {
    const email = this.isLoginMode 
      ? this.loginForm.get('email')?.value 
      : this.signupForm.get('email')?.value;
    
    if (!email) {
      this.errorMessage = 'Please enter your email address first.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const result = await this.authService.resetPassword(email);
    
    if (result.success) {
      this.successMessage = result.message;
    } else {
      this.errorMessage = result.message;
    }
    this.isLoading = false;
  }

  getEmailError() {
    const control = this.isLoginMode 
      ? this.loginForm.get('email') 
      : this.signupForm.get('email');
    
    if (control?.hasError('required')) return 'Email is required';
    if (control?.hasError('email')) return 'Invalid email format';
    return '';
  }

  getPasswordError() {
    const control = this.isLoginMode 
      ? this.loginForm.get('password') 
      : this.signupForm.get('password');
    
    if (control?.hasError('required')) return 'Password is required';
    if (control?.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }

  getConfirmPasswordError() {
    const control = this.signupForm.get('confirmPassword');
    if (control?.hasError('required')) return 'Please confirm your password';
    if (this.signupForm.hasError('passwordMismatch')) return 'Passwords do not match';
    return '';
  }
}

