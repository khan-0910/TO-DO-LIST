# 🔐 How to Add Environment Variables to Netlify

## ⚠️ IMPORTANT: Upload Manually, NOT from .env file!

**DO NOT** push your `.env.local` file to GitHub - it contains secrets!
**DO** add environment variables manually in Netlify dashboard.

---

## 📋 Step-by-Step Guide

### Step 1: Go to Netlify Dashboard
1. Open your browser and go to: https://app.netlify.com
2. Sign in to your account
3. Click on your site (TO-DO-LIST)

### Step 2: Navigate to Environment Variables
1. Click on **"Site settings"** (in the top menu)
2. In the left sidebar, click **"Environment variables"**
3. Click the **"Add a variable"** button

### Step 3: Add Each Variable Manually

You need to add **5 environment variables**. For each one:

1. Click **"Add a variable"** or **"Add a single variable"**
2. Enter the **Key** (variable name)
3. Enter the **Value** (your actual secret/connection string)
4. Select **"Same value for all deploy contexts"** (or customize if needed)
5. Click **"Create variable"**

---

## 🔑 Required Environment Variables

### 1. MONGODB_URI
**Key**: `MONGODB_URI`
**Value**: Your MongoDB Atlas connection string

**How to get it:**
1. Go to https://cloud.mongodb.com
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual database password
6. Replace `<dbname>` with your database name (e.g., `todoapp`)

**Example format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
```

---

### 2. GOOGLE_CLIENT_ID
**Key**: `GOOGLE_CLIENT_ID`
**Value**: Your Google OAuth Client ID

**How to get it:**
1. Go to https://console.cloud.google.com
2. Select your project (or create one)
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Name: "Task Manager"
7. Authorized JavaScript origins:
   - `https://your-app-name.netlify.app`
8. Authorized redirect URIs:
   - `https://your-app-name.netlify.app/api/auth/callback/google`
9. Click "Create"
10. Copy the **Client ID**

**Example format:**
```
123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

---

### 3. GOOGLE_CLIENT_SECRET
**Key**: `GOOGLE_CLIENT_SECRET`
**Value**: Your Google OAuth Client Secret

**How to get it:**
- Same process as Client ID above
- Copy the **Client Secret** from the same credentials page

**Example format:**
```
GOCSPX-abcdefghijklmnopqrstuvwxyz
```

---

### 4. NEXTAUTH_URL
**Key**: `NEXTAUTH_URL`
**Value**: Your Netlify app URL

**How to get it:**
1. In Netlify dashboard, go to your site
2. Look for "Site overview" or "Domain settings"
3. Copy your site URL (e.g., `https://your-app-name.netlify.app`)

**Example format:**
```
https://your-app-name.netlify.app
```

**⚠️ Important**: 
- Use `https://` (not `http://`)
- No trailing slash at the end
- Use your actual Netlify domain

---

### 5. NEXTAUTH_SECRET
**Key**: `NEXTAUTH_SECRET`
**Value**: A random secret string

**How to generate it:**

**Option A - Using Node.js (Recommended):**
1. Open terminal/command prompt
2. Run this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
3. Copy the output

**Option B - Using Online Generator:**
1. Go to https://generate-secret.vercel.app/32
2. Copy the generated secret

**Example format:**
```
abc123XYZ789randomString456DEF+/=
```

---

## 📸 Visual Guide

### Adding a Variable in Netlify:

```
┌─────────────────────────────────────────┐
│  Add environment variable               │
├─────────────────────────────────────────┤
│                                         │
│  Key:   [MONGODB_URI              ]    │
│                                         │
│  Value: [mongodb+srv://user:pass@...] │
│                                         │
│  Scopes:                                │
│  ☑ Same value for all deploy contexts  │
│                                         │
│  [Cancel]  [Create variable]            │
└─────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

After adding all 5 variables, verify:

- [ ] MONGODB_URI - Contains your MongoDB connection string
- [ ] GOOGLE_CLIENT_ID - Contains your Google OAuth Client ID
- [ ] GOOGLE_CLIENT_SECRET - Contains your Google OAuth Client Secret
- [ ] NEXTAUTH_URL - Contains your Netlify app URL (https://...)
- [ ] NEXTAUTH_SECRET - Contains a random secret string

---

## 🔄 After Adding Variables

### Step 1: Trigger a Redeploy
1. In Netlify dashboard, go to "Deploys"
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete

### Step 2: Test Your App
1. Visit your Netlify URL
2. Click "Sign In"
3. Sign in with Google
4. Create a task
5. Verify it saves correctly

---

## ⚠️ Common Mistakes to Avoid

### ❌ DON'T:
- Push `.env.local` to GitHub
- Share your secrets publicly
- Use `http://` for NEXTAUTH_URL (use `https://`)
- Add trailing slashes to URLs
- Forget to redeploy after adding variables

### ✅ DO:
- Add variables manually in Netlify dashboard
- Keep secrets private
- Use `https://` for NEXTAUTH_URL
- Double-check all values before saving
- Redeploy after adding variables

---

## 🔒 Security Best Practices

1. **Never commit secrets to Git**
   - `.env.local` is in `.gitignore` (already done)
   - Never push environment files

2. **Use different secrets for different environments**
   - Development: Use `.env.local` locally
   - Production: Use Netlify environment variables

3. **Rotate secrets regularly**
   - Change NEXTAUTH_SECRET periodically
   - Update MongoDB password if compromised

4. **Limit access**
   - Only share credentials with trusted team members
   - Use MongoDB IP whitelist (allow all: 0.0.0.0/0 for Netlify)

---

## 🆘 Troubleshooting

### Issue: "Sign in failed"
**Solution**: Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

### Issue: "Database connection failed"
**Solution**: 
- Verify MONGODB_URI is correct
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Ensure database user has read/write permissions

### Issue: "NextAuth configuration error"
**Solution**: 
- Verify NEXTAUTH_URL matches your Netlify domain
- Ensure NEXTAUTH_SECRET is set
- Check all variables are saved

### Issue: Changes not reflecting
**Solution**: 
- Trigger a new deploy in Netlify
- Clear browser cache
- Wait a few minutes for DNS propagation

---

## 📚 Quick Reference

| Variable | Where to Get It | Format |
|----------|----------------|--------|
| MONGODB_URI | MongoDB Atlas | `mongodb+srv://...` |
| GOOGLE_CLIENT_ID | Google Cloud Console | `123456-abc...apps.googleusercontent.com` |
| GOOGLE_CLIENT_SECRET | Google Cloud Console | `GOCSPX-...` |
| NEXTAUTH_URL | Your Netlify domain | `https://your-app.netlify.app` |
| NEXTAUTH_SECRET | Generate with Node.js | Random base64 string |

---

## 🎯 Summary

1. ✅ Add variables **manually** in Netlify dashboard
2. ✅ **Never** push `.env.local` to GitHub
3. ✅ Add all 5 required variables
4. ✅ Trigger a redeploy
5. ✅ Test your app

**Your environment variables are now secure and properly configured!** 🎉
