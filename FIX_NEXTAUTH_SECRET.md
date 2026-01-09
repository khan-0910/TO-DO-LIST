# 🔧 FIX: Password Contains Unescaped Characters

## The Problem

Error in URL:
```
/auth/error?error=Password%20contains%20unescaped%20characters
```

**This means your `NEXTAUTH_SECRET` environment variable contains special characters that need to be properly formatted.**

---

## ✅ Solution: Generate New NEXTAUTH_SECRET

### Option 1: Generate Online (Easiest)

1. Go to: https://generate-secret.vercel.app/32
2. Copy the generated secret (it will be safe, with no special characters)
3. Go to Netlify → Site settings → Environment variables
4. Find `NEXTAUTH_SECRET`
5. Click Edit
6. Paste the new secret
7. Save
8. Trigger redeploy

### Option 2: Generate Using Command Line

**On Windows (PowerShell):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**On Windows (Command Prompt):**
```cmd
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and use it as your new `NEXTAUTH_SECRET`.

---

## 📋 Step-by-Step Fix

### Step 1: Generate New Secret
Use one of the methods above to generate a new secret.

Example of a good secret:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### Step 2: Update in Netlify
1. Go to: https://app.netlify.com
2. Click your site (khanstodolist)
3. Site settings → Environment variables
4. Find `NEXTAUTH_SECRET`
5. Click "Edit" (or three dots → Edit)
6. Replace with your new secret
7. Click "Save"

### Step 3: Redeploy
1. Go to "Deploys" tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait 2-3 minutes

### Step 4: Test
1. Clear browser cache (Ctrl+Shift+Delete)
2. Go to: https://khanstodolist.netlify.app
3. Click "Sign In"
4. Choose your Google account
5. **It should work now!**

---

## ⚠️ Important Notes

### What Makes a Good NEXTAUTH_SECRET:
✅ Only letters (a-z, A-Z) and numbers (0-9)
✅ At least 32 characters long
✅ Random and unpredictable

### What to Avoid:
❌ Special characters like: `!@#$%^&*(){}[]|\/~`
❌ Spaces
❌ Quotes (' or ")
❌ Short secrets (less than 32 characters)

---

## 🔍 Why This Happened

NextAuth requires the secret to be URL-safe. If your secret contains special characters, they need to be properly escaped in URLs, which can cause issues. The easiest solution is to use a secret with only alphanumeric characters.

---

## 📋 Complete Checklist

After fixing NEXTAUTH_SECRET, make sure all these are correct:

### Environment Variables in Netlify:
```
NEXTAUTH_URL = https://khanstodolist.netlify.app
NEXTAUTH_SECRET = [your new 32+ character alphanumeric secret]
GOOGLE_CLIENT_ID = [your Google OAuth client ID]
GOOGLE_CLIENT_SECRET = [your Google OAuth client secret]
MONGODB_URI = [your MongoDB connection string]
```

### Google OAuth Settings:
```
Redirect URI: https://khanstodolist.netlify.app/api/auth/callback/google
JavaScript Origin: https://khanstodolist.netlify.app
```

---

**After updating NEXTAUTH_SECRET and redeploying, sign-in will work!**
