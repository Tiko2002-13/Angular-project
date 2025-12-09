# Deploy Backend Server to Production

Your backend server needs to be deployed so your production app can process payments. Here are the easiest options:

## Option 1: Railway (Recommended - Easiest)

1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with GitHub
2. **Create new project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select your repo**: Choose your Angular app repository
4. **Configure**:
   - Root Directory: Leave empty (or set to project root)
   - Build Command: Leave empty (we'll deploy the backend separately)
   - Start Command: `node backend-server.js`
5. **Add environment variable**:
   - Go to your project → Variables
   - Add: `STRIPE_SECRET_KEY` = `sk_test_51SXiFvGZJJGnPK4uQPnvEgBRUKN2Pof4NXQuiODGAatKI0sxI02HqqZ7hmnRXZv0mHXGR7nBR7JfaBQvdjLhefHg00nHi7KPJC`
6. **Get your URL**: Railway will give you a URL like `https://your-app.railway.app`
7. **Update environment.production.ts**: Set `apiUrl` to `https://your-app.railway.app/api`

## Option 2: Render (Free Tier Available)

1. **Sign up**: Go to [render.com](https://render.com) and sign up
2. **Create new Web Service**: Click "New" → "Web Service"
3. **Connect GitHub**: Select your repository
4. **Configure**:
   - Name: `stripe-backend`
   - Environment: `Node`
   - Build Command: `npm install` (from backend directory)
   - Start Command: `node backend-server.js`
   - Root Directory: Leave empty
5. **Add environment variable**:
   - Go to Environment → Add Environment Variable
   - Key: `STRIPE_SECRET_KEY`
   - Value: `sk_test_51SXiFvGZJJGnPK4uQPnvEgBRUKN2Pof4NXQuiODGAatKI0sxI02HqqZ7hmnRXZv0mHXGR7nBR7JfaBQvdjLhefHg00nHi7KPJC`
6. **Deploy**: Click "Create Web Service"
7. **Get your URL**: Render will give you a URL like `https://your-app.onrender.com`
8. **Update environment.production.ts**: Set `apiUrl` to `https://your-app.onrender.com/api`

## Option 3: Quick Test with ngrok (Temporary - For Testing Only)

If you just want to test quickly without deploying:

1. **Install ngrok**: `npm install -g ngrok` or download from [ngrok.com](https://ngrok.com)
2. **Start your backend**: `node backend-server.js` (should be running on port 3000)
3. **Start ngrok**: `ngrok http 3000`
4. **Copy the HTTPS URL**: You'll get something like `https://abc123.ngrok.io`
5. **Update environment.production.ts**: Set `apiUrl` to `https://abc123.ngrok.io/api`
6. **Rebuild and deploy**: `npm run build:prod && firebase deploy --only hosting`

⚠️ **Note**: ngrok URLs change every time you restart (unless you have a paid plan). This is only for testing!

## After Deployment

1. Update `src/environments/environment.production.ts`:
   ```typescript
   apiUrl: 'https://your-deployed-backend-url.com/api',
   ```

2. Rebuild and redeploy:
   ```bash
   npm run build:prod
   firebase deploy --only hosting
   ```

3. Test your payment flow on the deployed app!

## Security Note

For production, consider:
- Using environment variables for the Stripe secret key instead of hardcoding
- Adding rate limiting
- Adding authentication/authorization
- Using HTTPS only

