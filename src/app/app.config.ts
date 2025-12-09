import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { GlobalErrorHandler } from './services/error-handler.service';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

// Firebase configuration
const firebaseConfig = {
  apiKey: environment.firebase?.apiKey || "AIzaSyAzBA9mf-CkQlJSjdPn8FDGyQBfvaAidT8",
  authDomain: environment.firebase?.authDomain || "best--shop.firebaseapp.com",
  projectId: environment.firebase?.projectId || "best--shop",
  storageBucket: environment.firebase?.storageBucket || "best--shop.firebasestorage.app",
  messagingSenderId: environment.firebase?.messagingSenderId || "849015253046",
  appId: environment.firebase?.appId || "1:849015253046:web:391228bb00a8615d985097"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(), // Enable animations
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // Firebase providers
    provideFirebaseApp(() => firebaseApp),
    provideAuth(() => getAuth(firebaseApp))
  ]
};
