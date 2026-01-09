# 🔧 Google OAuth Redirect URI Fix

## Error: "Error 400: redirect_uri_mismatch"

This error means the redirect URI in Google Cloud Console doesn't match your Netlify URL.

---

## 🔍 The Problem

Your app is trying to redirect to:
```
https://khanstodolist.netlify.app/api/auth/callback/google
```

But Google OAuth doesn't have this exact URI configured.

---

## ✅ Solution: Update Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Open: https://console.cloud.google.com
2. Select your project
3. Go to: **APIs & Services** → **Credentials**

### Step 2: Edit Your OAuth 2.0 Client
1. Find your OAuth 2.0 Client ID
2. Click the **pencil icon** (Edit) next to it

### Step 3: Update Authorized Redirect URIs

**Remove any old URIs and add these EXACT URIs:**

```
https://khanstodolist.netlify.app/api/auth/callback/google
```

**Also add (for local testing):**
```
http://localhost:3000/api/auth/callback/google
```

### Step 4: Update Authorized JavaScript Origins

**Add these EXACT origins:**

```
https://khanstodolist.netlify.app
```

**Also add (for local testing):**
```
http://localhost:3000
```

### Step 5: Save Changes
Click **"Save"** at the bottom

---

## 📋 Checklist

Make sure you have:

### Authorized Redirect URIs:
- [ ] `https://khanstodolist.netlify.app/api/auth/callback/google`
- [ ] `http://localhost:3000/api/auth/callback/google` (optional, for local dev)

### Authorized JavaScript Origins:
- [ ] `https://khanstodolist.netlify.app`
- [ ] `http://localhost:3000` (optional, for local dev)

---

## ⚠️ Common Mistakes

### ❌ Wrong:
```
https://khanstodolist.netlify.app/
https://khanstodolist.netlify.app/api/auth/callback
khanstodolist.netlify.app/api/auth/callback/google
```

### ✅ Correct:
```
https://khanstodolist.netlify.app/api/auth/callback/google
```

**Important:**
- Must include `https://`
- Must include `/api/auth/callback/google` at the end
- No trailing slash
- Exact match required

---

## 🔄 After Fixing

1. **Save changes** in Google Cloud Console
2. **Wait 1-2 minutes** for changes to propagate
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Try signing in again**

---

## 🎯 Visual Guide

### What It Should Look Like:

```
Authorized redirect URIs
┌────────────────────────────────────────────────────────────────┐
│ https://khanstodolist.netlify.app/api/auth/callback/google   │
│ http://localhost:3000/api/auth/callback/google               │
└────────────────────────────────────────────────────────────────┘

Authorized JavaScript origins
┌────────────────────────────────────────────────────────────────┐
│ https://khanstodolist.netlify.app                            │
│ http://localhost:3000                                         │
└────────────────────────────────────────────────────────────────┘
```

---

## 🆘 Still Not Working?

### Double-check:
1. **Exact URL match**: Copy-paste from here to avoid typos
2. **HTTPS**: Make sure it starts with `https://`
3. **No extra spaces**: Trim any spaces before/after
4. **Saved changes**: Click Save button in Google Console
5. **Wait time**: Give it 1-2 minutes after saving

### Verify Your Netlify URL:
1. Go to Netlify dashboard
2. Check your site URL
3. Make sure it matches exactly: `https://khanstodolist.netlify.app`

---

## 📝 Quick Copy-Paste

**For Authorized Redirect URIs:**
```
https://khanstodolist.netlify.app/api/auth/callback/google
```

**For Authorized JavaScript Origins:**
```
https://khanstodolist.netlify.app
```

---

**After fixing this, sign-in will work!** ✅
