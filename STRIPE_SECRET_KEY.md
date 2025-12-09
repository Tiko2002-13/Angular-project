# 🔐 Stripe Secret Key - BACKEND ONLY

## ⚠️ CRITICAL SECURITY WARNING

**Your Stripe Secret Key should NEVER be in frontend code!**

Your secret key: `YOUR_STRIPE_SECRET_KEY_HERE`

## ✅ Where to Use Secret Key

**ONLY use the secret key in:**
- ✅ Backend server code (Node.js, Express, etc.)
- ✅ Firebase Cloud Functions
- ✅ Serverless functions
- ✅ Environment variables on your server

## ❌ Where NOT to Use Secret Key

**NEVER use the secret key in:**
- ❌ Frontend Angular code
- ❌ Environment files that get bundled with the app
- ❌ Browser JavaScript
- ❌ Public repositories (GitHub, etc.)

## 🔧 Backend Setup Example

### Firebase Functions

```javascript
// functions/.env or functions/config
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
```

### Node.js/Express

```javascript
// .env file (add to .gitignore!)
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
```

## 🛡️ Security Checklist

- [ ] Secret key is NOT in any frontend code
- [ ] Secret key is in `.gitignore`
- [ ] Secret key is only in backend environment variables
- [ ] Backend API validates requests before creating checkout sessions
- [ ] HTTPS is enabled in production

## 📝 Next Steps

1. Set up your backend server (see `STRIPE_SETUP.md`)
2. Add secret key to backend environment variables
3. Create API endpoint to handle checkout session creation
4. Update `stripe.service.ts` to call your backend API

