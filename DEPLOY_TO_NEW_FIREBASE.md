# 🚀 Deploy to New Firebase Account - Step by Step Guide

## Step 1: Create a New Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., `my-angular-app` or `my-ecommerce-app`)
4. Click **"Continue"**
5. (Optional) Enable Google Analytics - you can skip this or enable it
6. Click **"Create project"**
7. Wait for the project to be created, then click **"Continue"**

## Step 2: Get Your Firebase Configuration

1. In your new Firebase project, click the **gear icon (⚙️)** next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **"Add app"** and select the **Web icon (`</>`)**
5. Register your app:
   - **App nickname**: `My Angular App` (or any name you like)
   - **Firebase Hosting**: You can check this box (optional)
6. Click **"Register app"**
7. **Copy the Firebase configuration** - it will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 3: Enable Authentication

1. In Firebase Console, go to **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to **ON**
6. Click **"Save"**

## Step 4: Update Your Environment Files

Update these 3 files with your NEW Firebase configuration:

### File 1: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'My Angular App',
  version: '0.0.0',
  firebase: {
    apiKey: "YOUR-NEW-API-KEY-HERE",
    authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "YOUR-PROJECT-ID.appspot.com",
    messagingSenderId: "YOUR-SENDER-ID",
    appId: "YOUR-APP-ID"
  }
};
```

### File 2: `src/environments/environment.development.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'My Angular App (Dev)',
  version: '0.0.0',
  enableDebugTools: true,
  firebase: {
    apiKey: "YOUR-NEW-API-KEY-HERE",
    authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "YOUR-PROJECT-ID.appspot.com",
    messagingSenderId: "YOUR-SENDER-ID",
    appId: "YOUR-APP-ID"
  }
};
```

### File 3: `src/environments/environment.production.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourproductionurl.com/api',
  appName: 'My Angular App',
  version: '0.0.0',
  enableDebugTools: false,
  firebase: {
    apiKey: "YOUR-NEW-API-KEY-HERE",
    authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "YOUR-PROJECT-ID.appspot.com",
    messagingSenderId: "YOUR-SENDER-ID",
    appId: "YOUR-APP-ID"
  }
};
```

**Replace all the placeholder values with your actual Firebase config values!**

## Step 5: Set Up Firebase Hosting

1. In Firebase Console, go to **"Hosting"** in the left sidebar
2. Click **"Get started"**
3. Follow the setup wizard (you can skip the CLI setup for now)

## Step 6: Login to Firebase CLI

Open your terminal and run:

```bash
firebase login
```

This will open a browser window. Sign in with your **NEW Firebase account**.

## Step 7: Initialize Firebase in Your Project

```bash
cd "/Users/thayrapetyan/Desktop/my-angular-app copy"
firebase init
```

When prompted:

1. **Select features**: 
   - Use arrow keys to navigate
   - Press **Space** to select **Hosting**
   - Press **Enter** to continue

2. **Select a default Firebase project**:
   - Select your **NEW project** from the list
   - Or choose "Use an existing project" and select your new project

3. **What do you want to use as your public directory?**
   - Type: `dist/my-angular-app/browser`
   - Press **Enter**

4. **Configure as a single-page app?**
   - Type: **Yes** (or `y`)
   - Press **Enter**

5. **Set up automatic builds and deploys with GitHub?**
   - Type: **No** (or `n`)
   - Press **Enter**

6. **File dist/my-angular-app/browser/index.html already exists. Overwrite?**
   - Type: **No** (or `n`)
   - Press **Enter**

## Step 8: Update Firebase Configuration Files

### Update `.firebaserc`

This file should now have your new project ID:

```json
{
  "projects": {
    "default": "your-new-project-id"
  }
}
```

### Update `firebase.json`

The hosting section should look like this:

```json
{
  "hosting": {
    "public": "dist/my-angular-app/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Step 9: Build Your App

Build your app for production:

```bash
npm run build:prod
```

Wait for the build to complete. You should see:
```
✔ Application bundle generation complete.
```

## Step 10: Deploy to Firebase

Deploy your app:

```bash
firebase deploy --only hosting
```

You'll see output like:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project-id/overview
Hosting URL: https://your-project-id.web.app
```

## Step 11: Access Your Deployed App

Your app is now live at:
- **Hosting URL**: `https://your-project-id.web.app`
- **Alternative URL**: `https://your-project-id.firebaseapp.com`

## ✅ Verification Checklist

- [ ] Created new Firebase project
- [ ] Got Firebase configuration
- [ ] Enabled Email/Password authentication
- [ ] Updated all 3 environment files
- [ ] Logged into Firebase CLI with new account
- [ ] Initialized Firebase in project
- [ ] Built the app (`npm run build:prod`)
- [ ] Deployed to Firebase (`firebase deploy --only hosting`)
- [ ] App is accessible at the hosting URL

## 🔧 Troubleshooting

### "Firebase CLI not found"
```bash
npm install -g firebase-tools
```

### "Permission denied" or "Not authorized"
- Make sure you're logged in with the correct account: `firebase login`
- Check that you selected the correct project during `firebase init`

### "Build failed"
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build:prod`

### "Hosting site not found"
- Go to Firebase Console → Hosting
- Click "Get started" if you haven't set up hosting yet

## 🎉 Success!

Your app should now be:
- ✅ Deployed to your new Firebase project
- ✅ Accessible via the hosting URL
- ✅ Ready for users to sign up and login

## 📝 Next Steps

1. Test the login/signup functionality on the deployed site
2. Customize your Firebase project settings
3. Set up custom domain (optional)
4. Configure Firebase Security Rules (if needed)

