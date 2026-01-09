# 🔧 TROUBLESHOOTING GUIDE

## 🚨 Current Issues You're Experiencing

### Issue 1: Sign-In Error (404 Configuration Error)
**URL**: `khanstodolist.netlify.app/auth/error?error=Configuration`
**Error**: "404 - This page could not be found"

### Issue 2: Failed to Load Tasks
**Error**: "Failed to load tasks"
**Symptom**: Can't add tasks, empty columns

---

## ✅ SOLUTIONS

### Problem: NextAuth Configuration Missing

The app needs a NextAuth API route that might be missing. Let me check and fix this.

---

## 🔍 Checklist - What to Verify

### 1. Environment Variables in Netlify
Go to Netlify → Site settings → Environment variables

**Verify these 5 variables are set:**
- [ ] `MONGODB_URI` - Your MongoDB connection string
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console  
- [ ] `NEXTAUTH_URL` - Should be: `https://khanstodolist.netlify.app`
- [ ] `NEXTAUTH_SECRET` - Random secret string

**If any are missing, add them and redeploy!**

---

### 2. Google OAuth Configuration

Go to https://console.cloud.google.com

**Check Authorized redirect URIs includes:**
```
https://khanstodolist.netlify.app/api/auth/callback/google
```

**Check Authorized JavaScript origins includes:**
```
https://khanstodolist.netlify.app
```

---

### 3. MongoDB Connection

**Check MongoDB Atlas:**
1. Go to https://cloud.mongodb.com
2. Click "Network Access"
3. Ensure IP whitelist includes: `0.0.0.0/0` (allow from anywhere)
4. Click "Database Access"
5. Ensure your user has "Read and write to any database" permissions

---

## 🛠️ Quick Fixes

### Fix 1: Verify NEXTAUTH_URL
The error suggests NextAuth can't find its configuration.

**In Netlify environment variables:**
- Variable: `NEXTAUTH_URL`
- Value: `https://khanstodolist.netlify.app` (NO trailing slash!)

### Fix 2: Verify NEXTAUTH_SECRET
**Generate a new secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add this as `NEXTAUTH_SECRET` in Netlify.

### Fix 3: Redeploy After Adding Variables
1. Go to Netlify → Deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. Wait for deployment to complete

---

## 📋 Step-by-Step Fix Process

### Step 1: Check Environment Variables
```
Netlify Dashboard → Your Site → Site settings → Environment variables
```

**You should see 5 variables:**
1. MONGODB_URI
2. GOOGLE_CLIENT_ID
3. GOOGLE_CLIENT_SECRET
4. NEXTAUTH_URL = `https://khanstodolist.netlify.app`
5. NEXTAUTH_SECRET

### Step 2: Verify Google OAuth Setup
```
Google Cloud Console → APIs & Services → Credentials
```

**Your OAuth 2.0 Client should have:**
- Authorized JavaScript origins: `https://khanstodolist.netlify.app`
- Authorized redirect URIs: `https://khanstodolist.netlify.app/api/auth/callback/google`

### Step 3: Check MongoDB
```
MongoDB Atlas → Network Access
```
- Should have `0.0.0.0/0` in IP Access List

### Step 4: Redeploy
```
Netlify → Deploys → Trigger deploy → Clear cache and deploy site
```

---

## 🔍 Common Mistakes

### ❌ Wrong NEXTAUTH_URL
```
Wrong: http://khanstodolist.netlify.app (http instead of https)
Wrong: https://khanstodolist.netlify.app/ (trailing slash)
Right: https://khanstodolist.netlify.app
```

### ❌ Missing Environment Variables
If you see "Configuration" error, it usually means:
- NEXTAUTH_URL is missing or wrong
- NEXTAUTH_SECRET is missing
- GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing

### ❌ Google OAuth Not Configured
If Google sign-in fails:
- Redirect URI doesn't match
- JavaScript origins not set
- Credentials not created

### ❌ MongoDB Connection Issues
If "Failed to load tasks":
- MONGODB_URI is wrong
- IP not whitelisted
- Database user doesn't have permissions

---

## 🎯 Most Likely Solution

Based on your errors, the most likely issue is:

**Missing or incorrect NEXTAUTH_URL**

### Fix:
1. Go to Netlify → Site settings → Environment variables
2. Check if `NEXTAUTH_URL` exists
3. If missing, add it: `https://khanstodolist.netlify.app`
4. If exists, verify it's exactly: `https://khanstodolist.netlify.app` (no trailing slash, https not http)
5. Click "Trigger deploy" → "Clear cache and deploy site"

---

## 📞 Still Not Working?

### Check Netlify Build Logs
1. Go to Netlify → Deploys
2. Click on the latest deploy
3. Look for errors in the build log
4. Share any error messages

### Check Browser Console
1. Open your app
2. Press F12 (Developer Tools)
3. Go to "Console" tab
4. Look for error messages
5. Share any errors you see

---

## ✅ After Fixing

Once environment variables are set correctly:
1. Sign in should work
2. Tasks should load
3. You can add/edit/delete tasks
4. Tasks save to MongoDB

---

**Most common fix: Add/fix NEXTAUTH_URL in Netlify environment variables!**
