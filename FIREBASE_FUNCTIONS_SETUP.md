# 🔥 Firebase Functions Setup for Stripe

Your Stripe backend is now set up using Firebase Cloud Functions! This is much better than a separate server since everything is integrated with your Firebase project.

## ⚠️ IMPORTANT: Upgrade Firebase Plan

**Firebase Functions require the Blaze (pay-as-you-go) plan.** Don't worry - there's a generous free tier that covers most use cases:

- **2 million function invocations per month** (free)
- **400,000 GB-seconds of compute time** (free)
- **200,000 CPU-seconds** (free)

**To upgrade:**
1. Go to: https://console.firebase.google.com/project/best--shop/usage/details
2. Click "Upgrade" or "Modify plan"
3. Select "Blaze Plan"
4. Add a payment method (you won't be charged unless you exceed free tier)

## ✅ What's Been Set Up

1. **Firebase Functions directory** (`functions/`)
2. **Stripe checkout function** (`createCheckoutSession`)
3. **Payment verification function** (`verifyPayment`)
4. **Updated Stripe service** to use Firebase Functions
5. **Environment files** configured

## 🚀 Deploy Firebase Functions

### Step 1: Install Dependencies (Already Done ✅)

```bash
cd functions
npm install
```

### Step 2: Set Stripe Secret Key (Already Done ✅)

The Stripe secret key has been configured. The function will use it automatically.

### Step 3: Deploy Functions

**After upgrading to Blaze plan**, run:

```bash
# From the project root
firebase deploy --only functions
```

This will deploy your functions and give you URLs like:
- `https://us-central1-best--shop.cloudfunctions.net/createCheckoutSession`
- `https://us-central1-best--shop.cloudfunctions.net/verifyPayment`

### Step 4: Rebuild and Deploy Frontend

```bash
npm run build:prod
firebase deploy --only hosting
```

## 🧪 Testing Locally (Optional)

You can test Firebase Functions locally using the emulator:

```bash
# Install Firebase Tools if you haven't
npm install -g firebase-tools

# Start emulator
firebase emulators:start --only functions
```

Then update `environment.development.ts` to use:
```typescript
apiUrl: 'http://localhost:5001/best--shop/us-central1/createCheckoutSession'
```

## 📝 How It Works

1. **User clicks "Proceed to checkout"** on payment page
2. **Angular app calls** Firebase Function `createCheckoutSession`
3. **Function creates** Stripe Checkout Session
4. **User is redirected** to Stripe Checkout
5. **After payment**, user returns to your app

## 🔒 Security

- Stripe secret key is stored securely in Firebase Functions config
- Functions run server-side (never exposed to client)
- CORS is configured to only allow your domain

## 🎉 Benefits Over Separate Backend

✅ **No separate server to manage**  
✅ **Integrated with Firebase project**  
✅ **Automatic scaling**  
✅ **Free tier available**  
✅ **Easy deployment**  
✅ **Built-in security**

## 📚 Next Steps

1. Deploy the functions: `firebase deploy --only functions`
2. Rebuild and deploy frontend: `npm run build:prod && firebase deploy --only hosting`
3. Test the payment flow on your deployed app!

## 🐛 Troubleshooting

**Function not found?**
- Make sure you deployed: `firebase deploy --only functions`
- Check the function URL in Firebase Console → Functions

**CORS errors?**
- The function already has CORS enabled
- Make sure your domain is in the allowed origins

**Stripe errors?**
- Check that your Stripe secret key is correct
- Verify Stripe API keys in Stripe Dashboard

