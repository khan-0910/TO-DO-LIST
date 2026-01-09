# Google OAuth Setup Guide - Complete Step-by-Step

## 🔐 Set Up Google OAuth for Your Task Manager App

Follow these exact steps to enable Google Sign-In for your application.

---

## Part 1: Create Google Cloud Project

### Step 1: Go to Google Cloud Console
1. Open your browser and go to: https://console.cloud.google.com/
2. Sign in with your Google account

### Step 2: Create a New Project
1. Click the **project dropdown** at the top (next to "Google Cloud")
2. Click **"NEW PROJECT"** button (top right)
3. Enter project details:
   - **Project name**: `Task Manager App` (or your preferred name)
   - **Organization**: Leave as "No organization" (unless you have one)
4. Click **"CREATE"**
5. Wait for the project to be created (takes ~10 seconds)
6. Click **"SELECT PROJECT"** when it appears

---

## Part 2: Enable Google+ API

### Step 3: Enable Required APIs
1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. In the search bar, type: `Google+ API`
3. Click on **"Google+ API"**
4. Click the **"ENABLE"** button
5. Wait for it to enable (~5 seconds)

---

## Part 3: Configure OAuth Consent Screen

### Step 4: Set Up Consent Screen
1. In the left sidebar, click **"OAuth consent screen"**
2. Choose **"External"** (unless you have a Google Workspace)
3. Click **"CREATE"**

### Step 5: Fill in App Information
**Page 1 - OAuth consent screen:**
- **App name**: `Task Manager` (or your app name)
- **User support email**: Select your email from dropdown
- **App logo**: (Optional - skip for now)
- **Application home page**: Leave empty for now (add after deployment)
- **Application privacy policy link**: Leave empty for now
- **Application terms of service link**: Leave empty for now
- **Authorized domains**: Leave empty for now (add after deployment)
- **Developer contact information**: Enter your email address
- Click **"SAVE AND CONTINUE"**

**Page 2 - Scopes:**
- Click **"ADD OR REMOVE SCOPES"**
- Check these scopes:
  - ✅ `.../auth/userinfo.email`
  - ✅ `.../auth/userinfo.profile`
  - ✅ `openid`
- Click **"UPDATE"**
- Click **"SAVE AND CONTINUE"**

**Page 3 - Test users:**
- Click **"ADD USERS"**
- Enter your email address (and any other test users)
- Click **"ADD"**
- Click **"SAVE AND CONTINUE"**

**Page 4 - Summary:**
- Review everything
- Click **"BACK TO DASHBOARD"**

---

## Part 4: Create OAuth Credentials

### Step 6: Create OAuth Client ID
1. In the left sidebar, click **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** (at the top)
3. Select **"OAuth client ID"**

### Step 7: Configure OAuth Client
1. **Application type**: Select **"Web application"**
2. **Name**: `Task Manager Web Client` (or your preferred name)

3. **Authorized JavaScript origins**:
   - Click **"+ ADD URI"**
   - For local testing, add: `http://localhost:3000`
   - After deployment, add your Netlify URL: `https://your-app-name.netlify.app`

4. **Authorized redirect URIs**:
   - Click **"+ ADD URI"**
   - For local testing, add: `http://localhost:3000/api/auth/callback/google`
   - After deployment, add: `https://your-app-name.netlify.app/api/auth/callback/google`

5. Click **"CREATE"**

### Step 8: Save Your Credentials
A popup will appear with your credentials:
- **Client ID**: Looks like `123456789-abc123def456.apps.googleusercontent.com`
- **Client Secret**: Looks like `GOCSPX-abc123def456ghi789`

**IMPORTANT**: 
- ✅ Copy the **Client ID** - you'll need this
- ✅ Copy the **Client Secret** - you'll need this
- ✅ Keep these SECRET - never share them publicly!

You can also download the JSON file for backup.

---

## Part 5: Add Credentials to Your App

### Step 9: Update Environment Variables

**For Local Development** (create `.env.local` file):
```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here
MONGODB_URI=your-mongodb-connection-string
```

**For Netlify Deployment**:
1. Go to your Netlify site dashboard
2. Click **"Site settings"** → **"Environment variables"**
3. Click **"Add a variable"**
4. Add these variables one by one:

| Key | Value |
|-----|-------|
| `GOOGLE_CLIENT_ID` | Your Client ID from Step 8 |
| `GOOGLE_CLIENT_SECRET` | Your Client Secret from Step 8 |
| `NEXTAUTH_URL` | `https://your-app-name.netlify.app` |
| `NEXTAUTH_SECRET` | Generate using command below |
| `MONGODB_URI` | Your MongoDB connection string |

### Step 10: Generate NextAuth Secret
Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Copy the output and use it as your `NEXTAUTH_SECRET`

---

## Part 6: Update After Deployment

### Step 11: Add Production URLs
After deploying to Netlify:

1. Go back to Google Cloud Console
2. Navigate to **"Credentials"**
3. Click on your OAuth client name
4. Under **"Authorized JavaScript origins"**, add:
   ```
   https://your-actual-app-name.netlify.app
   ```
5. Under **"Authorized redirect URIs"**, add:
   ```
   https://your-actual-app-name.netlify.app/api/auth/callback/google
   ```
6. Click **"SAVE"**

### Step 12: Update OAuth Consent Screen (Optional)
1. Go to **"OAuth consent screen"**
2. Click **"EDIT APP"**
3. Add your deployed URLs:
   - **Application home page**: `https://your-app-name.netlify.app`
   - **Authorized domains**: `netlify.app`
4. Click **"SAVE AND CONTINUE"** through all pages

---

## Testing Your Setup

### Local Testing:
1. Run your app: `npm run dev`
2. Go to: `http://localhost:3000`
3. Click "Sign In"
4. You should see Google sign-in popup
5. Sign in with your test user email

### Production Testing:
1. Deploy to Netlify
2. Go to your Netlify URL
3. Click "Sign In"
4. Sign in with Google
5. You should be redirected back to your app

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution**: Make sure your redirect URI in Google Console exactly matches:
- Local: `http://localhost:3000/api/auth/callback/google`
- Production: `https://your-app-name.netlify.app/api/auth/callback/google`

### Error: "Access blocked: This app's request is invalid"
**Solution**: 
1. Check that you've added your email as a test user
2. Make sure the OAuth consent screen is configured
3. Verify all required scopes are added

### Error: "Invalid client"
**Solution**: 
1. Double-check your Client ID and Client Secret
2. Make sure there are no extra spaces when copying
3. Verify environment variables are set correctly in Netlify

### App Still in Testing Mode
**This is normal!** Your app will work fine in testing mode with up to 100 test users. To publish:
1. Go to OAuth consent screen
2. Click "PUBLISH APP"
3. Submit for verification (only needed if you want unlimited users)

---

## Quick Reference

### What You Need:
1. ✅ Google Cloud Project created
2. ✅ OAuth consent screen configured
3. ✅ OAuth Client ID created
4. ✅ Client ID and Client Secret saved
5. ✅ Environment variables added to Netlify
6. ✅ Redirect URIs configured

### Environment Variables Needed:
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=https://your-app.netlify.app
NEXTAUTH_SECRET=generated-secret
MONGODB_URI=mongodb-connection-string
```

---

## Security Best Practices

✅ **DO:**
- Keep your Client Secret private
- Use environment variables (never hardcode)
- Add only necessary redirect URIs
- Regularly review authorized users

❌ **DON'T:**
- Share your Client Secret publicly
- Commit credentials to GitHub
- Add wildcard redirect URIs
- Skip the consent screen setup

---

## Need Help?

If you encounter issues:
1. Check the Google Cloud Console error messages
2. Verify all URLs match exactly (including http/https)
3. Make sure environment variables are set in Netlify
4. Check browser console for detailed error messages

---

**Congratulations! Your Google OAuth is now set up! 🎉**

Users can now sign in to your Task Manager app using their Google accounts!
