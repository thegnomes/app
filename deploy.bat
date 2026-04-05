@echo off
echo ===================================
echo   Vercel Deployment Helper
echo ===================================
echo.

REM Download Vercel CLI if not exists
if not exist "vercel-cli.exe" (
    echo Downloading Vercel CLI...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/vercel/vercel/releases/download/vercel%4032.7.0/vercel-win-x64.exe' -OutFile 'vercel-cli.exe' -UseBasicParsing"
    if errorlevel 1 (
        echo Failed to download Vercel CLI
        exit /b 1
    )
    echo Download complete!
)

echo.
echo Choose deployment option:
echo 1. Login to Vercel (first time)
echo 2. Deploy to production
echo 3. Deploy preview
echo.
set /p choice="Enter option (1-3): "

if "%choice%"=="1" (
    echo.
    echo Opening browser for login...
    vercel-cli.exe login
)

if "%choice%"=="2" (
    echo.
    echo Deploying to production...
    vercel-cli.exe --prod
)

if "%choice%"=="3" (
    echo.
    echo Deploying preview...
    vercel-cli.exe
)

echo.
echo Done!
pause
