# 🚀 HRMS Lite - Deployment Guide

This guide will walk you through deploying the HRMS Lite application to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before deploying, ensure you have:

- ✅ Git repository (GitHub, GitLab, or Bitbucket)
- ✅ Supabase account with configured database
- ✅ Accounts for deployment platforms (choose one per service):
  - **Backend:** Railway, Render, or Heroku
  - **Frontend:** Vercel, Netlify, or Cloudflare Pages

---

## 🔙 Backend Deployment

### Option 1: Railway (Recommended)

**Why Railway?**
- ✨ Zero-config Python support
- 🆓 Free tier with 500 hours/month
- 🚀 Automatic HTTPS
- 📦 Easy environment variable management

**Steps:**

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI (optional)
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Link your project
   cd backend
   railway init
   
   # Deploy
   railway up
   ```

3. **Or Use Web Dashboard:**
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Set root directory to `backend`
   - Railway auto-detects Python and deploys

4. **Add Environment Variables:**
   Go to your project → Variables tab:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ENVIRONMENT=production
   ```

5. **Get Your Backend URL:**
   - Railway provides: `https://your-project.railway.app`
   - Or use custom domain

---

### Option 2: Render

**Steps:**

1. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - New → Web Service
   - Connect your GitHub repository
   - Configure:
     ```
     Name: hrms-backend
     Region: Choose closest to your users
     Branch: main
     Root Directory: backend
     Runtime: Python 3
     Build Command: pip install -r requirements.txt
     Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
     ```

3. **Add Environment Variables:**
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ENVIRONMENT=production
   PYTHON_VERSION=3.11.6
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render auto-deploys on git push

5. **Get Your Backend URL:**
   - Render provides: `https://hrms-backend.onrender.com`

---

### Option 3: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   # Windows
   winget install Heroku.HerokuCLI
   
   # Or download from heroku.com
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create hrms-backend
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_KEY=your_key
   heroku config:set FRONTEND_URL=your_frontend_url
   heroku config:set ENVIRONMENT=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Get Your Backend URL:**
   - Heroku provides: `https://hrms-backend.herokuapp.com`

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

**Why Vercel?**
- ⚡ Lightning-fast global CDN
- 🆓 Generous free tier
- 🔄 Automatic deployments on git push
- 🌐 Custom domains with SSL

**Steps:**

1. **Create Vercel Account**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     ```
     Framework Preset: Vite
     Root Directory: frontend
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```

3. **Add Environment Variable:**
   - Go to Project Settings → Environment Variables
   ```env
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel builds and deploys automatically

5. **Get Your Frontend URL:**
   - Vercel provides: `https://your-project.vercel.app`
   - Add custom domain in settings

---

### Option 2: Netlify

**Steps:**

1. **Create Netlify Account**
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Configure:
     ```
     Base directory: frontend
     Build command: npm run build
     Publish directory: frontend/dist
     ```

3. **Add Environment Variable:**
   - Site settings → Environment variables
   ```env
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy:**
   - Click "Deploy site"
   - Netlify builds and deploys

5. **Get Your Frontend URL:**
   - Netlify provides: `https://your-project.netlify.app`

---

### Option 3: Cloudflare Pages

**Steps:**

1. **Create Cloudflare Account**
   - Visit [pages.cloudflare.com](https://pages.cloudflare.com)

2. **Deploy Frontend**
   - Workers & Pages → Create application → Pages
   - Connect to Git
   - Configure:
     ```
     Framework preset: Vite
     Build command: npm run build
     Build output directory: dist
     Root directory: frontend
     ```

3. **Add Environment Variable:**
   ```env
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy:**
   - Save and Deploy

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend.vercel.app

# Environment
ENVIRONMENT=production
```

### Frontend (.env)

```env
# Backend API URL
VITE_API_URL=https://your-backend.railway.app
```

**Important:** 
- Never commit `.env` files to Git
- Use `.env.example` as template
- Set variables in deployment platform dashboards

---

## ✅ Post-Deployment

### 1. Update Backend CORS

After deploying frontend, update backend environment variable:
```env
FRONTEND_URL=https://your-actual-frontend-url.vercel.app
```

### 2. Test API Connection

```bash
# Test backend health
curl https://your-backend-url.railway.app/

# Should return: {"message": "HRMS Lite API is running"}
```

### 3. Test Frontend

1. Visit your frontend URL
2. Try logging in: `admin` / `admin123`
3. Test all features:
   - ✅ Dashboard loads
   - ✅ View employees
   - ✅ Add new employee
   - ✅ Mark attendance
   - ✅ Filter attendance records

### 4. Custom Domain (Optional)

**For Vercel:**
1. Project Settings → Domains
2. Add your domain (e.g., `hrms.yourcompany.com`)
3. Update DNS records as instructed

**For Railway:**
1. Project → Settings → Domains
2. Add custom domain
3. Update CNAME record

### 5. Update Mobile App Manifest

If using custom domain, update `frontend/public/manifest.json`:
```json
{
  "start_url": "https://your-custom-domain.com",
  ...
}
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `CORS origin error`
```
Access to fetch at 'https://backend.railway.app' from origin 'https://frontend.vercel.app' 
has been blocked by CORS policy
```

**Solution:**
1. Check backend `FRONTEND_URL` environment variable
2. Ensure it matches your exact frontend URL (no trailing slash)
3. Redeploy backend after updating

---

**Problem:** `Supabase connection error`
```
ValueError: SUPABASE_URL and SUPABASE_KEY must be set
```

**Solution:**
1. Verify environment variables are set in deployment platform
2. Check for typos in variable names
3. Ensure no extra spaces in values

---

**Problem:** `Module not found error`

**Solution:**
1. Check `requirements.txt` includes all dependencies
2. Trigger rebuild in deployment platform

---

### Frontend Issues

**Problem:** `API requests failing / 404 errors`

**Solution:**
1. Check `VITE_API_URL` environment variable
2. Ensure backend is deployed and running
3. Check browser console for actual error
4. Verify API URL doesn't have trailing slash

---

**Problem:** `White screen / Build fails`

**Solution:**
1. Check build logs in deployment platform
2. Run `npm run build` locally to test
3. Verify all dependencies are in `package.json`
4. Clear build cache and retry

---

**Problem:** `Environment variable not updating`

**Solution:**
1. Vite only loads env vars that start with `VITE_`
2. Rebuild/redeploy after changing env vars
3. Clear browser cache

---

## 📊 Monitoring

### Backend Monitoring

**Railway:**
- View logs: Project → Deployments → View logs
- Metrics: Project → Metrics tab

**Render:**
- Logs: Service → Logs tab
- Metrics: Service → Metrics

### Frontend Monitoring

**Vercel:**
- Analytics: Project → Analytics
- Logs: Project → Deployments → Function logs

**Netlify:**
- Analytics: Site → Analytics
- Logs: Site → Deploys → Deploy log

---

## 🔄 CI/CD (Automatic Deployments)

All platforms support automatic deployments:

1. **Push to main branch** → Auto-deploy to production
2. **Push to dev branch** → Create preview deployment
3. **Pull request** → Create preview deployment

### Configure Branch Deployments

**Vercel:**
- Settings → Git → Production Branch: `main`

**Railway:**
- Settings → GitHub → Watch Paths: Enable

---

## 📱 PWA Deployment

Your app is already PWA-ready with `manifest.json`. After deployment:

1. Visit your site on mobile
2. Browser will prompt "Add to Home Screen"
3. App installs like a native app
4. Works offline (basic functionality)

---

## 💰 Cost Estimation

### Free Tier Limits

**Railway:**
- 500 execution hours/month
- $5 credit/month
- Shared CPU

**Render:**
- Free tier: 750 hours/month
- Spins down after inactivity
- Shared resources

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic SSL

**Netlify:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic SSL

### Recommended for Production

- **Small team (< 50 users):** Free tiers sufficient
- **Medium team (50-200 users):** Railway Hobby ($5/mo) + Vercel Pro ($20/mo)
- **Large team (200+ users):** Dedicated hosting recommended

---

## 🎯 Quick Deployment Checklist

- [ ] Database created in Supabase
- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Backend environment variables set
- [ ] Backend URL obtained
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Frontend environment variable set (VITE_API_URL)
- [ ] Backend CORS updated with frontend URL
- [ ] Test login functionality
- [ ] Test CRUD operations
- [ ] Custom domains configured (optional)
- [ ] SSL certificates active ✅

---

## 🆘 Need Help?

- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Render Community: [community.render.com](https://community.render.com)

---

## 🎉 Success!

Your HRMS Lite application is now live and accessible from anywhere! 🚀

**Next Steps:**
- Share the URL with your team
- Set up monitoring alerts
- Configure backups
- Add more features

---

**Deployment Time:** ~15-30 minutes  
**Difficulty:** ⭐⭐⚪⚪⚪ (Beginner-Friendly)
