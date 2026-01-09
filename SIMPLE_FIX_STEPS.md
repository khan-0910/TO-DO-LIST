# 🔧 SIMPLE FIX - Follow These Exact Steps

## The OAuth Error You're Seeing

**Error**: "Error 400: redirect_uri_mismatch"

This means Google doesn't recognize your Netlify URL. Here's how to fix it:

---

## ✅ Step-by-Step Fix (5 Minutes)

### Step 1: Open Google Cloud Console
1. Go to: https://console.cloud.google.com
2. Sign in with your Google account
3. You should see your project dashboard

### Step 2: Go to Credentials
1. On the left sidebar, click **"APIs & Services"**
2. Click **"Credentials"**
3. You'll see a list of your credentials

### Step 3: Find Your OAuth Client
1. Look for **"OAuth 2.0 Client IDs"** section
2. You should see your client (might be named "Web client" or similar)
3. Click the **pencil icon** (✏️) next to it to edit

### Step 4: Update Redirect URIs
1. Scroll down to **"Authorized redirect URIs"**
2. You'll see a text box
3. **DELETE any old URIs** (if any)
4. **ADD this EXACT URI** (copy-paste it):
   ```
   https://khanstodolist.netlify.app/api/auth/callback/google
   ```
5. Make sure there are NO spaces before or after
6. Make sure it starts with `https://`
7. Make sure it ends with `/google`

### Step 5: Update JavaScript Origins
1. Scroll to **"Authorized JavaScript origins"**
2. **DELETE any old origins** (if any)
3. **ADD this EXACT origin** (copy-paste it):
   ```
   https://khanstodolist.netlify.app
   ```
4. Make sure there are NO spaces
5. Make sure it starts with `https://`
6. Make sure there's NO trailing slash

### Step 6: Save
1. Scroll to the bottom
2. Click the blue **"SAVE"** button
3. Wait for the success message

### Step 7: Wait & Test
1. **Wait 2 minutes** for changes to take effect
2. **Clear your browser cache**:
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Click "Clear data"
3. **Close and reopen your browser**
4. Go to: https://khanstodolist.netlify.app
5. Click "Sign In"
6. **It should work now!**

---

## 📸 What It Should Look Like

```
Authorized redirect URIs
┌────────────────────────────────────────────────────────────┐
│ https://khanstodolist.netlify.app/api/auth/callback/google│
│ [+ ADD URI]                                                │
└────────────────────────────────────────────────────────────┘

Authorized JavaScript origins
┌────────────────────────────────────────────────────────────┐
│ https://khanstodolist.netlify.app                         │
│ [+ ADD URI]                                                │
└────────────────────────────────────────────────────────────┘
```

---

## ❌ Common Mistakes

### Mistake 1: Wrong URL
**Wrong**: `khanstodolist.netlify.app/api/auth/callback/google`
**Right**: `https://khanstodolist.netlify.app/api/auth/callback/google`
(Must include `https://`)

### Mistake 2: Extra Slash
**Wrong**: `https://khanstodolist.netlify.app/`
**Right**: `https://khanstodolist.netlify.app`
(No trailing slash for origins)

### Mistake 3: Typo in Path
**Wrong**: `https://khanstodolist.netlify.app/api/auth/callback`
**Right**: `https://khanstodolist.netlify.app/api/auth/callback/google`
(Must end with `/google`)

### Mistake 4: Didn't Save
Make sure you clicked the **SAVE** button at the bottom!

### Mistake 5: Didn't Wait
Changes take 1-2 minutes to take effect. Wait before testing.

---

## 🆘 If Still Not Working

### Double-Check These:

1. **Exact URL Match**:
   - Redirect URI: `https://khanstodolist.netlify.app/api/auth/callback/google`
   - JavaScript Origin: `https://khanstodolist.netlify.app`

2. **Saved Changes**:
   - Did you click SAVE?
   - Did you see a success message?

3. **Waited**:
   - Did you wait 2 minutes?
   - Did you clear browser cache?

4. **Correct Project**:
   - Are you in the right Google Cloud project?
   - Check project name at the top of the page

5. **Correct Client**:
   - Are you editing the right OAuth client?
   - Check the Client ID matches what's in Netlify

---

## 📞 Need More Help?

If you've followed all steps exactly and it still doesn't work:

1. Take a screenshot of your OAuth client settings
2. Take a screenshot of the error
3. Check if your Netlify URL is exactly: `https://khanstodolist.netlify.app`
4. Make sure you're using the same Google account for both Cloud Console and testing

---

**This should fix the OAuth error. Follow each step carefully!**
