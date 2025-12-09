# 🆓 Deploy Backend to Free Hosting (No Firebase Functions Needed)

Since you want to use the free Firebase plan, here's how to deploy your existing backend server to a **free hosting service**. These services offer free tiers that are perfect for your use case!

## 🎯 Recommended: Render (Easiest & Free)

### Step 1: Create Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (free)

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository (or use "Public Git repository")
3. If using public repo, paste your repo URL

### Step 3: Configure Service
- **Name**: `stripe-backend` (or any name)
- **Environment**: `Node`
- **Build Command**: `cd "/Users/thayrapetyan/Desktop/my-angular-app copy" && npm install --prefix .` (or just `npm install` if deploying from repo root)
- **Start Command**: `node backend-server.js`
- **Root Directory**: Leave empty (or set to project root if deploying from repo)

### Step 4: Add Environment Variable
1. Go to **Environment** tab
2. Click **"Add Environment Variable"**
3. Add:
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: `sk_test_51SXiFvGZJJGnPK4uQPnvEgBRUKN2Pof4NXQuiODGAatKI0sxI02HqqZ7hmnRXZv0mHXGR7nBR7JfaBQvdjLhefHg00nHi7KPJC`

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (takes 2-3 minutes)
3. Copy your service URL (e.g., `https://stripe-backend.onrender.com`)

### Step 6: Update Your App
Update `src/environments/environment.production.ts`:

```typescript
apiUrl: 'https://stripe-backend.onrender.com/api',
```

Then rebuild and deploy:
```bash
npm run build:prod
firebase deploy --only hosting
```

---

## 🚂 Alternative: Railway (Also Free)

### Step 1: Create Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"** (or upload your code)

### Step 3: Configure
- **Root Directory**: Leave empty
- **Build Command**: Leave empty (or `npm install`)
- **Start Command**: `node backend-server.js`

### Step 4: Add Environment Variable
1. Go to **Variables** tab
2. Add:
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: `sk_test_51SXiFvGZJJGnPK4uQPnvEgBRUKN2Pof4NXQuiODGAatKI0sxI02HqqZ7hmnRXZv0mHXGR7nBR7JfaBQvdjLhefHg00nHi7KPJC`

### Step 5: Deploy
1. Railway will auto-deploy
2. Copy your service URL (e.g., `https://your-app.railway.app`)

### Step 6: Update Your App
Same as Render - update `environment.production.ts` with the Railway URL.

---

## 📝 Manual Deployment (If You Don't Have a Git Repo)

If you don't want to use Git, you can deploy manually:

### Option A: Render Manual Deploy
1. Create account on Render
2. Click **"New +"** → **"Web Service"**
3. Choose **"Public Git repository"** or **"Private Git repository"**
4. Or use **"Manual Deploy"** and upload a ZIP of your project

### Option B: Use ngrok (Temporary Testing Only)
For quick testing without deploying:

```bash
# Install ngrok
npm install -g ngrok

# Start your backend
node backend-server.js

# In another terminal, start ngrok
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Update environment.production.ts with this URL
```

⚠️ **Note**: ngrok URLs change every restart (unless paid). Only for testing!

---

## ✅ After Deployment

1. **Update environment.production.ts** with your deployed backend URL
2. **Rebuild**: `npm run build:prod`
3. **Deploy**: `firebase deploy --only hosting`
4. **Test**: Go to your deployed app and try checkout!

---

## 🆓 Free Tier Limits

**Render:**
- Free tier available
- Service may sleep after 15 minutes of inactivity (wakes up on first request)
- Perfect for low to medium traffic

**Railway:**
- $5 free credit per month
- Pay-as-you-go after that
- Very generous for small projects

Both are perfect for your use case and won't cost anything for typical e-commerce traffic!

---

## 🎉 Benefits

✅ **No Firebase plan upgrade needed**  
✅ **Free hosting available**  
✅ **Easy deployment**  
✅ **Works with your existing backend code**  
✅ **Automatic HTTPS**  
✅ **Easy to update**

