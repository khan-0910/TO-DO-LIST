# 🔧 FIX: App Redirecting to Old URL

## The Problem

Your app is trying to redirect to:
```
https://admirable-zuccutto-d5a07e.netlify.app/api/auth/callback/google
```

But your current site is:
```
https://khanstodolist.netlify.app
```

**This means the `NEXTAUTH_URL` environment variable in Netlify is set to the old URL.**

---

## ✅ Solution: Update Environment Variable

### Step 1: Go to Netlify
1. Open: https://app.netlify.com
2. Click on your site (khanstodolist)
3. Go to: **Site settings**

### Step 2: Update NEXTAUTH_URL
1. Click **"Environment variables"** (in the left sidebar)
2. Find the variable named: **`NEXTAUTH_URL`**
3. Click **"Edit"** (or the three dots → Edit)
4. Change the value from:
   ```
   https://admirable-zuccutto-d5a07e.netlify.app
   ```
   To:
   ```
   https://khanstodolist.netlify.app
   ```
5. Click **"Save"**

### Step 3: Redeploy
1. Go to: **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait 2-3 minutes for deployment to complete

### Step 4: Update Google OAuth
Now update Google Cloud Console with the correct URL:

1. Go to: https://console.cloud.google.com
2. APIs & Services → Credentials
3. Edit your OAuth 2.0 Client
4. **Delete the old redirect URI** (admirable-zuccutto-d5a07e.netlify.app)
5. **Add the new redirect URI**:
   ```
   https://khanstodolist.netlify.app/api/auth/callback/google
   ```
6. **Delete the old JavaScript origin** (if present)
7. **Add the new JavaScript origin**:
   ```
   https://khanstodolist.netlify.app
   ```
8. Click **"SAVE"**

### Step 5: Test
1. Wait 2 minutes for changes to propagate
2. Clear browser cache (Ctrl+Shift+Delete)
3. Go to: https://khanstodolist.netlify.app
4. Click "Sign In"
5. **It should work now!**

---

## 📋 Quick Checklist

- [ ] Updated `NEXTAUTH_URL` in Netlify to: `https://khanstodolist.netlify.app`
- [ ] Triggered redeploy in Netlify
- [ ] Updated Google OAuth redirect URI to: `https://khanstodolist.netlify.app/api/auth/callback/google`
- [ ] Updated Google OAuth JavaScript origin to: `https://khanstodolist.netlify.app`
- [ ] Saved changes in Google Cloud Console
- [ ] Waited 2 minutes
- [ ] Cleared browser cache
- [ ] Tested sign-in

---

## 🎯 What Each URL Should Be

### In Netlify Environment Variables:
```
NEXTAUTH_URL = https://khanstodolist.netlify.app
```

### In Google Cloud Console (Redirect URI):
```
https://khanstodolist.netlify.app/api/auth/callback/google
```

### In Google Cloud Console (JavaScript Origin):
```
https://khanstodolist.netlify.app
```

---

## 💡 Why This Happened

The `NEXTAUTH_URL` environment variable tells NextAuth what your site's URL is. It was still set to your old Netlify URL, so when you tried to sign in, it redirected to the old URL instead of the new one.

---

**After updating the environment variable and redeploying, sign-in will work!**
