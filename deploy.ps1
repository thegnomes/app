# Vercel Deployment Script
# This script downloads and uses the Vercel CLI to deploy the project

$VercelVersion = "32.7.0"
$VercelUrl = "https://github.com/vercel/vercel/releases/download/vercel%40$VercelVersion/vercel-win-x64.exe"
$VercelPath = ".\vercel-cli.exe"

Write-Host "🚀 Vercel Deployment Script" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

# Download Vercel CLI if not exists
if (-not (Test-Path $VercelPath)) {
    Write-Host "📥 Downloading Vercel CLI..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $VercelUrl -OutFile $VercelPath -UseBasicParsing
        Write-Host "✅ Vercel CLI downloaded!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to download Vercel CLI" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
        exit 1
    }
}

# Check if user is logged in
Write-Host ""
Write-Host "🔑 Checking Vercel login status..." -ForegroundColor Yellow
$loginCheck = & $VercelPath whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to Vercel" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please login first by running:" -ForegroundColor Cyan
    Write-Host "  .\vercel-cli.exe login" -ForegroundColor White
    Write-Host ""
    Write-Host "Or deploy with token:" -ForegroundColor Cyan
    Write-Host "  .\vercel-cli.exe --token YOUR_TOKEN" -ForegroundColor White
    exit 1
}

Write-Host "✅ Logged in as: $loginCheck" -ForegroundColor Green

# Deploy
Write-Host ""
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
& $VercelPath --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed" -ForegroundColor Red
}
