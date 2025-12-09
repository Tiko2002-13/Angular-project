# Firebase Authentication Setup Guide

## 🔥 Setting Up Firebase Authentication

### Step 1: Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `gd-gcp-internship-ui`
3. Click on the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. If you don't have a web app, click "Add app" and select the web icon (</>)
7. Copy the Firebase configuration object

### Step 2: Update Environment Files

Update the Firebase configuration in these files:

**`src/environments/environment.ts`** (Development)
**`src/environments/environment.development.ts`** (Development)
**`src/environments/environment.production.ts`** (Production)

Replace the placeholder values with your actual Firebase config:

```typescript
firebase: {
  apiKey: "AIzaSy...", // Your actual API key
  authDomain: "gd-gcp-internship-ui.firebaseapp.com",
  projectId: "gd-gcp-internship-ui",
  storageBucket: "gd-gcp-internship-ui.appspot.com",
  messagingSenderId: "123456789", // Your actual sender ID
  appId: "1:123456789:web:abc123" // Your actual app ID
}
```

### Step 3: Enable Authentication in Firebase Console

1. In Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started" if you haven't enabled it yet
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

### Step 4: Configure Email Templates (Optional)

1. In Firebase Console, go to "Authentication" → "Templates"
2. Customize the email verification template if needed
3. Customize the password reset template if needed

## 🔐 Two-Factor Authentication (2FA)

This app uses **Email Verification as 2FA** - the simplest and most user-friendly approach:

1. **User signs up** → Account created
2. **Verification email sent** → User receives email with verification link
3. **User clicks link** → Email verified (2FA step completed)
4. **User can now login** → Only verified users can access the app

### How It Works

- After signup, users receive a verification email
- Users **must verify their email** before they can login
- This acts as the second factor of authentication
- No additional apps or codes needed - just click the email link

## 🚀 Testing the Authentication

1. **Start the app**: `npm start`
2. **Navigate to**: `http://localhost:4200/login`
3. **Sign up** with a test email
4. **Check your email** for the verification link
5. **Click the verification link**
6. **Login** with your credentials

## 📝 Protected Routes

To protect a route, add the `authGuard`:

```typescript
{
  path: 'payment',
  loadComponent: () => import('../pages/card-payment/card-payment').then(m => m.CardPayment),
  canActivate: [authGuard], // Add this
  title: 'Payment - My Angular App'
}
```

## 🔧 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've updated the Firebase config in environment files
- Verify all config values are correct

### "Email verification not working"
- Check Firebase Console → Authentication → Sign-in method
- Ensure Email/Password is enabled
- Check spam folder for verification emails

### "User can login without verification"
- The app requires email verification before login
- Check that `emailVerified` check is working in `auth.service.ts`

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [AngularFire Documentation](https://github.com/angular/angularfire)

