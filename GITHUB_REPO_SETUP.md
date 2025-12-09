# 📦 What Code Must Be in Your GitHub Repo

For Render (or any hosting service) to deploy your backend, you need these files in your GitHub repository:

## ✅ Required Files for Backend Deployment

### 1. **backend-server.js** (Main backend file)
This is your Express server that handles Stripe checkout.

### 2. **package.json** (Root or Backend)
You have two options:

**Option A: Use root package.json** (if it has backend dependencies)
- Your root `package.json` should include: `express`, `stripe`, `cors`

**Option B: Create separate backend package.json** (Recommended)
- Create `backend-package.json` in root
- Or create a `backend/` folder with its own `package.json`

### 3. **.gitignore** (Optional but recommended)
To exclude unnecessary files from Git.

---

## 📁 Recommended Repository Structure

```
my-angular-app/
├── backend-server.js          ✅ REQUIRED
├── backend-package.json        ✅ REQUIRED (or use root package.json)
├── package.json                ✅ (if using root for backend)
├── .gitignore                  ✅ (recommended)
│
├── src/                        (Angular frontend - not needed for backend)
├── angular.json                (Angular config - not needed for backend)
├── node_modules/               ❌ (exclude from Git)
└── dist/                       ❌ (exclude from Git)
```

---

## 🔧 Setup Options

### Option 1: Use Root package.json (Simplest)

**Your root `package.json` should include backend dependencies:**

```json
{
  "name": "my-angular-app",
  "scripts": {
    "start": "node backend-server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "stripe": "^20.0.0",
    "cors": "^2.8.5"
  }
}
```

**Render Configuration:**
- Build Command: `npm install`
- Start Command: `node backend-server.js`
- Root Directory: (leave empty)

### Option 2: Separate Backend Folder (More Organized)

**Create `backend/` folder:**

```
backend/
├── server.js          (rename backend-server.js)
└── package.json       (copy from backend-package.json)
```

**Render Configuration:**
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && node server.js`
- Root Directory: (leave empty)

### Option 3: Use backend-package.json in Root

**Keep `backend-package.json` in root:**

**Render Configuration:**
- Build Command: `npm install --prefix . --package-lock-only=false` (or custom script)
- Start Command: `node backend-server.js`
- Root Directory: (leave empty)

**Note**: This is trickier. Option 1 or 2 is easier.

---

## 📝 Step-by-Step: What to Commit to GitHub

### 1. Create/Update .gitignore

Create `.gitignore` in your repo root:

```gitignore
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
*.log

# Environment files
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

### 2. Ensure Backend Files Are Present

Make sure these files are in your repo:
- ✅ `backend-server.js`
- ✅ `package.json` (with express, stripe, cors dependencies)
- ✅ `.gitignore`

### 3. Commit and Push

```bash
git add backend-server.js package.json .gitignore
git commit -m "Add backend server for Stripe payments"
git push origin main
```

---

## 🚀 Render Deployment Settings

Once your code is on GitHub, configure Render:

**Basic Settings:**
- **Repository**: Your GitHub repo
- **Branch**: `main` (or your default branch)
- **Root Directory**: (leave empty)
- **Environment**: `Node`

**Build Settings:**
- **Build Command**: `npm install`
- **Start Command**: `node backend-server.js`

**Environment Variables:**
- `STRIPE_SECRET_KEY` = `sk_test_51SXiFvGZJJGnPK4uQPnvEgBRUKN2Pof4NXQuiODGAatKI0sxI02HqqZ7hmnRXZv0mHXGR7nBR7JfaBQvdjLhefHg00nHi7KPJC`

---

## ✅ Quick Checklist

Before deploying to Render, make sure:

- [ ] `backend-server.js` is in your GitHub repo
- [ ] `package.json` includes: `express`, `stripe`, `cors`
- [ ] `.gitignore` excludes `node_modules/` and `dist/`
- [ ] Code is pushed to GitHub
- [ ] Render can access your repo (public or connected account)

---

## 🎯 Recommended: Simple Setup

**Easiest approach:**

1. **Add backend dependencies to root `package.json`**:
   ```json
   "dependencies": {
     "express": "^4.19.2",
     "stripe": "^20.0.0",
     "cors": "^2.8.5"
   }
   ```

2. **Ensure `backend-server.js` is in root**

3. **Commit and push to GitHub**

4. **Deploy on Render with**:
   - Build: `npm install`
   - Start: `node backend-server.js`

That's it! 🎉

