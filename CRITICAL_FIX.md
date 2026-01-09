# 🔥 CRITICAL FIX - Environment Variable Names

## ⚠️ Issue Found

The NextAuth configuration was using **wrong environment variable names**!

### What Was Wrong:
```javascript
// OLD (WRONG):
clientId: process.env.AUTH_GOOGLE_ID,
clientSecret: process.env.AUTH_GOOGLE_SECRET
```

### What I Fixed:
```javascript
// NEW (CORRECT):
clientId: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET
```

---

## ✅ Fix Applied

**File Updated**: `src/app/api/auth/[...nextauth]/options.js`

Now the app will correctly read the environment variables you set in Netlify!

---

## 🚀 What to Do Now

### Step 1: Commit and Push the Fix
```bash
cd C:/Users/khana/Desktop/todo-app-main
git add .
git commit -m "fix: correct environment variable names for NextAuth"
git push
```

### Step 2: Verify Environment Variables in Netlify

Go to: **Netlify → Site settings → Environment variables**

Make sure you have these **5 variables** set:

| Variable Name | Example Value |
|--------------|---------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/todoapp` |
| `GOOGLE_CLIENT_ID` | `123456-abc...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` |
| `NEXTAUTH_URL` | `https://khanstodolist.netlify.app` |
| `NEXTAUTH_SECRET` | `random-base64-string` |

### Step 3: Wait for Deployment

Netlify will automatically deploy after you push. Wait 2-3 minutes.

### Step 4: Test Your App

1. Go to https://khanstodolist.netlify.app
2. Click "Sign In"
3. Sign in with Google
4. Add a task
5. It should work! ✅

---

## 🎯 What This Fix Does

**Before**: App looked for `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` (which don't exist)
**After**: App looks for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (which you set in Netlify)

**Result**: Sign-in will work! 🎉

---

## 📋 Checklist

- [x] Fixed environment variable names in code
- [ ] Commit and push changes
- [ ] Verify environment variables in Netlify
- [ ] Wait for deployment
- [ ] Test sign-in
- [ ] Test adding tasks

---

## 🆘 If Still Not Working

### Check These:

1. **Environment Variables in Netlify**
   - All 5 variables are set
   - No typos in variable names
   - Values are correct

2. **Google OAuth Configuration**
   - Authorized redirect URI: `https://khanstodolist.netlify.app/api/auth/callback/google`
   - Authorized JavaScript origins: `https://khanstodolist.netlify.app`

3. **MongoDB**
   - Connection string is correct
   - IP whitelist includes `0.0.0.0/0`
   - Database user has permissions

---

**This fix should resolve both issues:**
- ✅ Sign-in error (404 Configuration)
- ✅ Failed to load tasks

**Just commit, push, and wait for deployment!** 🚀
