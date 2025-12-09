# 🔑 How to Get Your Firebase API Key and Configuration

## Step-by-Step Guide

### Step 1: Go to Firebase Console
1. Open your browser and go to: **https://console.firebase.google.com/**
2. Sign in with your Google account (the one you used to create the Firebase project)

### Step 2: Select Your Project
1. You should see your project: **`gd-gcp-internship-ui`**
2. Click on it to open the project dashboard

### Step 3: Access Project Settings
1. Look for the **gear icon (⚙️)** next to "Project Overview" in the left sidebar
2. Click on it and select **"Project settings"** from the dropdown menu

### Step 4: Find Your Web App Configuration
1. Scroll down to the **"Your apps"** section
2. You'll see a list of apps (iOS, Android, Web, etc.)
3. Look for the **Web app** (it has a `</>` icon)

### Step 5: Get Your Configuration
**Option A: If you already have a Web app:**
1. Click on the web app in the list
2. You'll see your Firebase configuration object
3. It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "gd-gcp-internship-ui.firebaseapp.com",
     projectId: "gd-gcp-internship-ui",
     storageBucket: "gd-gcp-internship-ui.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890"
   };
   ```

**Option B: If you don't have a Web app yet:**
1. Click the **"Add app"** button (or the `</>` icon)
2. Register your app:
   - **App nickname**: Give it a name (e.g., "My Angular App")
   - **Firebase Hosting**: You can check this if you want, but it's optional
3. Click **"Register app"**
4. You'll see your Firebase configuration object displayed
5. **Copy the entire config object**

### Step 6: Copy Your Configuration Values
Copy these values from the Firebase Console:

- ✅ **apiKey**: `"AIzaSy..."` (long string)
- ✅ **authDomain**: `"gd-gcp-internship-ui.firebaseapp.com"`
- ✅ **projectId**: `"gd-gcp-internship-ui"`
- ✅ **storageBucket**: `"gd-gcp-internship-ui.appspot.com"`
- ✅ **messagingSenderId**: `"123456789012"` (numbers)
- ✅ **appId**: `"1:123456789012:web:abcdef..."` (long string)

### Step 7: Update Your Environment Files

Update these 3 files in your project:

**File 1: `src/environments/environment.ts`**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'My Angular App',
  version: '0.0.0',
  firebase: {
    apiKey: "AIzaSy...", // ← Paste your apiKey here
    authDomain: "gd-gcp-internship-ui.firebaseapp.com", // ← Your authDomain
    projectId: "gd-gcp-internship-ui", // ← Your projectId
    storageBucket: "gd-gcp-internship-ui.appspot.com", // ← Your storageBucket
    messagingSenderId: "123456789012", // ← Your messagingSenderId
    appId: "1:123456789012:web:abcdef..." // ← Your appId
  }
};
```

**File 2: `src/environments/environment.development.ts`**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'My Angular App (Dev)',
  version: '0.0.0',
  enableDebugTools: true,
  firebase: {
    apiKey: "AIzaSy...", // ← Same values as above
    authDomain: "gd-gcp-internship-ui.firebaseapp.com",
    projectId: "gd-gcp-internship-ui",
    storageBucket: "gd-gcp-internship-ui.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef..."
  }
};
```

**File 3: `src/environments/environment.production.ts`**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourproductionurl.com/api',
  appName: 'My Angular App',
  version: '0.0.0',
  enableDebugTools: false,
  firebase: {
    apiKey: "AIzaSy...", // ← Same values as above
    authDomain: "gd-gcp-internship-ui.firebaseapp.com",
    projectId: "gd-gcp-internship-ui",
    storageBucket: "gd-gcp-internship-ui.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef..."
  }
};
```

## 📸 Visual Guide

The Firebase Console will show you something like this:

```
┌─────────────────────────────────────────┐
│ Firebase SDK snippet                    │
│ Choose your config format:             │
│                                         │
│ const firebaseConfig = {                │
│   apiKey: "AIzaSy...",                  │
│   authDomain: "...",                    │
│   projectId: "...",                    │
│   storageBucket: "...",                 │
│   messagingSenderId: "...",             │
│   appId: "..."                          │
│ };                                      │
│                                         │
│ [Copy] button                           │
└─────────────────────────────────────────┘
```

## ⚠️ Important Notes

1. **Keep your API key secure**: Don't commit it to public repositories if possible
2. **Same config for all environments**: Use the same Firebase config for dev and production (Firebase handles this automatically)
3. **API Key restrictions**: You can restrict your API key in Firebase Console → Project Settings → General → Your apps → Web app → API key settings

## ✅ After Updating

1. Save all three environment files
2. Restart your development server:
   ```bash
   npm start
   ```
3. Try logging in again - the 400 error should be gone!

## 🆘 Still Having Issues?

If you can't find your Firebase config:
1. Make sure you're logged into the correct Google account
2. Make sure you're looking at the correct project (`gd-gcp-internship-ui`)
3. If the project doesn't exist, you may need to create it first in Firebase Console

## 🔗 Quick Links

- **Firebase Console**: https://console.firebase.google.com/
- **Your Project**: https://console.firebase.google.com/project/gd-gcp-internship-ui

