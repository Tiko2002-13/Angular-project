import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, User, onAuthStateChanged, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  private authStateSubject = new BehaviorSubject<User | null>(null);
  public authState$: Observable<User | null> = this.authStateSubject.asObservable();
  
  public isAuthenticated$: Observable<boolean> = this.authState$.pipe(
    map(user => !!user && user.emailVerified)
  );
  
  public userEmail$: Observable<string | null> = this.authState$.pipe(
    map(user => user?.email || null)
  );

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.authStateSubject.next(user);
    });
  }

  async signUp(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.auth) {
        return {
          success: false,
          message: 'Firebase is not configured. Please check your Firebase configuration.'
        };
      }
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      try {
        await sendEmailVerification(userCredential.user);
        return {
          success: true,
          message: 'Registration successful! Please check your email to verify your account (2FA).'
        };
      } catch (emailError: any) {
        console.warn('Email verification send failed, but user created:', emailError);
        return {
          success: true,
          message: 'Account created! However, verification email could not be sent. You can request a new verification email from the login page.'
        };
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      const errorCode = error?.code || error?.message || 'unknown-error';
      return {
        success: false,
        message: this.getErrorMessage(errorCode)
      };
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; message: string; needsVerification: boolean }> {
    try {
      if (!this.auth) {
        console.error('Firebase Auth is not initialized');
        return {
          success: false,
          message: 'Firebase is not configured. Please check your Firebase configuration.',
          needsVerification: false
        };
      }
      console.log('Attempting to sign in with email:', email);
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        await signOut(this.auth);
        return {
          success: false,
          message: 'Please verify your email address first. Check your inbox for the verification link.',
          needsVerification: true
        };
      }
      
      return {
        success: true,
        message: 'Login successful!',
        needsVerification: false
      };
    } catch (error: any) {
      console.error('Sign in error:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      const errorCode = error?.code || error?.message || 'unknown-error';
      return {
        success: false,
        message: this.getErrorMessage(errorCode),
        needsVerification: false
      };
    }
  }

  async resendVerificationEmail(): Promise<{ success: boolean; message: string }> {
    try {
      const user = this.auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        return {
          success: true,
          message: 'Verification email sent! Please check your inbox.'
        };
      }
      await this.auth.authStateReady();
      const currentUser = this.auth.currentUser;
      if (currentUser && !currentUser.emailVerified) {
        await sendEmailVerification(currentUser);
        return {
          success: true,
          message: 'Verification email sent! Please check your inbox.'
        };
      }
      return {
        success: false,
        message: 'No unverified user found. Please sign up first.'
      };
    } catch (error: any) {
      console.error('Resend verification error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error?.code || error?.message || 'unknown-error')
      };
    }
  }

  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return {
        success: true,
        message: 'Password reset email sent! Please check your inbox.'
      };
    } catch (error: any) {
      return {
        success: false,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please use a different email or try logging in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please enter a valid email.';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed. Please enable Email/Password authentication in Firebase Console.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters. Please choose a stronger password.';
      case 'auth/user-disabled':
        return 'This user account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or use "Forgot Password" to reset it.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/invalid-api-key':
        return 'Firebase configuration error. Please check your Firebase API key and configuration.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      case 'unknown-error':
        return 'An unexpected error occurred. Please try again.';
      default:
        if (errorCode?.includes('400') || errorCode?.includes('Bad Request')) {
          return 'Invalid request. Please check your Firebase configuration in environment files.';
        }
        if (typeof errorCode === 'string' && errorCode.includes('email-already-in-use')) {
          return 'This email is already registered. Please use a different email or try logging in instead.';
        }
        return `An error occurred: ${errorCode || 'Please try again.'}`;
    }
  }
}

