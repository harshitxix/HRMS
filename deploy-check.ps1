# 🚀 Quick Deploy Check Script

Write-Host "🔍 HRMS Lite - Deployment Checklist" -ForegroundColor Cyan
Write-Host "===================================`n" -ForegroundColor Cyan

$allGood = $true

# Check if environment files exist
Write-Host "📋 Checking Environment Configuration..." -ForegroundColor Yellow

if (Test-Path "frontend\.env") {
    Write-Host "  ✅ Frontend .env exists" -ForegroundColor Green
    
    $frontendEnv = Get-Content "frontend\.env" -Raw
    if ($frontendEnv -match "VITE_API_URL=http://localhost") {
        Write-Host "  ⚠️  Warning: Frontend .env still uses localhost" -ForegroundColor Yellow
        Write-Host "     Update VITE_API_URL with your deployed backend URL" -ForegroundColor Gray
        $allGood = $false
    } else {
        Write-Host "  ✅ Frontend .env configured for production" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ Frontend .env missing" -ForegroundColor Red
    Write-Host "     Copy .env.example to .env and configure" -ForegroundColor Gray
    $allGood = $false
}

if (Test-Path "backend\.env") {
    Write-Host "  ✅ Backend .env exists" -ForegroundColor Green
    
    $backendEnv = Get-Content "backend\.env" -Raw
    if ($backendEnv -match "your_supabase") {
        Write-Host "  ❌ Backend .env not configured" -ForegroundColor Red
        Write-Host "     Update SUPABASE_URL and SUPABASE_KEY" -ForegroundColor Gray
        $allGood = $false
    } else {
        Write-Host "  ✅ Backend .env configured" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ Backend .env missing" -ForegroundColor Red
    Write-Host "     Copy .env.example to .env and configure" -ForegroundColor Gray
    $allGood = $false
}

Write-Host "`n📦 Checking Dependencies..." -ForegroundColor Yellow

# Check frontend dependencies
if (Test-Path "frontend\node_modules") {
    Write-Host "  ✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ❌ Frontend dependencies missing" -ForegroundColor Red
    Write-Host "     Run: cd frontend && npm install" -ForegroundColor Gray
    $allGood = $false
}

# Check backend dependencies
if (Test-Path "backend\venv") {
    Write-Host "  ✅ Backend virtual environment exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Backend virtual environment not found" -ForegroundColor Yellow
    Write-Host "     Run: cd backend && python -m venv venv" -ForegroundColor Gray
}

Write-Host "`n🔧 Checking Configuration Files..." -ForegroundColor Yellow

$configFiles = @(
    @{path="frontend\vercel.json"; name="Vercel config"},
    @{path="frontend\netlify.toml"; name="Netlify config"},
    @{path="backend\Procfile"; name="Heroku Procfile"},
    @{path="backend\railway.json"; name="Railway config"},
    @{path="backend\requirements.txt"; name="Python requirements"}
)

foreach ($file in $configFiles) {
    if (Test-Path $file.path) {
        Write-Host "  ✅ $($file.name)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $($file.name) missing" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host "`n🌐 Deployment Readiness..." -ForegroundColor Yellow

if ($allGood) {
    Write-Host "  ✅ All checks passed! Ready to deploy!" -ForegroundColor Green
    Write-Host "`n📚 Next step: Follow DEPLOYMENT.md guide" -ForegroundColor Cyan
} else {
    Write-Host "  ⚠️  Some issues found. Please fix them before deploying." -ForegroundColor Yellow
    Write-Host "`n📚 See DEPLOYMENT.md for setup instructions" -ForegroundColor Cyan
}

Write-Host "`n===================================`n" -ForegroundColor Cyan

Write-Host "📋 Quick Links:" -ForegroundColor Yellow
Write-Host "  • Railway: https://railway.app" -ForegroundColor Cyan
Write-Host "  • Vercel: https://vercel.com" -ForegroundColor Cyan
Write-Host "  • Render: https://render.com" -ForegroundColor Cyan
Write-Host "  • Netlify: https://netlify.com" -ForegroundColor Cyan
Write-Host ""

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
