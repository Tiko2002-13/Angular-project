export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000', // Use local backend server for development, or empty for Firebase Functions
  appName: 'My Angular App (Dev)',
  version: '0.0.0',
  enableDebugTools: true,
  firebase: {
    apiKey: "AIzaSyAzBA9mf-CkQlJSjdPn8FDGyQBfvaAidT8",
    authDomain: "best--shop.firebaseapp.com",
    projectId: "best--shop",
    storageBucket: "best--shop.firebasestorage.app",
    messagingSenderId: "849015253046",
    appId: "1:849015253046:web:391228bb00a8615d985097"
  },
  stripe: {
    publishableKey: "pk_test_51SXiFvGZJJGnPK4uRAJGcVRiRx9j6mFzSxeUHhL8re7wbXZ8tOsGHjfhvzqUggE73VdUO80Z65LvtAmI8JBLtVRL00hQrIaMNt"
  }
};

