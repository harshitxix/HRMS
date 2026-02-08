# 🚀 HRMS Lite - Quick Start Guide

## Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Supabase account

### Setup

1. **Clone and Install**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Mac/Linux
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   ```bash
   # Frontend
   cd frontend
   copy .env.example .env
   # Edit .env and set VITE_API_URL
   
   # Backend
   cd ../backend
   copy .env.example .env
   # Edit .env and set SUPABASE_URL, SUPABASE_KEY
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   .\venv\Scripts\activate
   uvicorn main:app --reload
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:8000
   - Login: admin / admin123

---

## Production Deployment

### Quick Deploy (15 minutes)

**Option 1: Railway + Vercel (Recommended)**

1. **Backend on Railway:**
   - Sign up: https://railway.app
   - New Project → Deploy from GitHub
   - Select repository, set root: `backend`
   - Add environment variables (see DEPLOYMENT.md)
   - Deploy ✅

2. **Frontend on Vercel:**
   - Sign up: https://vercel.com
   - New Project → Import from GitHub
   - Set root: `frontend`
   - Add env: `VITE_API_URL=<railway-url>`
   - Deploy ✅

**Option 2: Render + Netlify**

1. **Backend on Render:**
   - Sign up: https://render.com
   - New Web Service → Connect GitHub
   - Root: `backend`, Runtime: Python 3
   - Add environment variables
   - Deploy ✅

2. **Frontend on Netlify:**
   - Sign up: https://netlify.com
   - New site → Import from GitHub
   - Base: `frontend`, Publish: `frontend/dist`
   - Add env: `VITE_API_URL=<render-url>`
   - Deploy ✅

---

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[README.md](./README.md)** - Project overview
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Database setup

---

## 🛠️ Helper Scripts

**Windows:**
```powershell
# Build for production
.\build.ps1

# Check deployment readiness
.\deploy-check.ps1
```

**Mac/Linux:**
```bash
# Build for production
chmod +x build.sh
./build.sh
```

---

## 🎯 Features

✅ Employee Management  
✅ Attendance Tracking  
✅ Dashboard Analytics  
✅ Mobile Responsive  
✅ PWA Support  
✅ Modern Animations  

---

## 🆘 Need Help?

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database issues
3. Check platform-specific documentation

---

## 🎉 Success Criteria

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Can login with admin/admin123
- [ ] Can view dashboard
- [ ] Can add/view employees
- [ ] Can mark attendance
- [ ] No CORS errors in console

---

**Deployment Time:** ~15-30 minutes  
**Difficulty:** ⭐⭐⚪⚪⚪ Beginner-Friendly
