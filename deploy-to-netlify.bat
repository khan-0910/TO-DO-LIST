@echo off
echo ========================================
echo Task Manager - Netlify Deployment Script
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Checking Netlify CLI installation...
call netlify --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Netlify CLI not found. Installing...
    call npm install -g netlify-cli
) else (
    echo Netlify CLI is already installed.
)
echo.

echo Step 2: Logging into Netlify...
echo This will open your browser for authentication.
call netlify login
echo.

echo Step 3: Initializing Netlify site...
call netlify init
echo.

echo Step 4: Deploying to Netlify...
call netlify deploy --prod
echo.

echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Set environment variables in Netlify dashboard
echo 2. Update Google OAuth redirect URIs
echo 3. Test your deployed site
echo.
echo For detailed instructions, see DEPLOYMENT.md
echo.
pause
