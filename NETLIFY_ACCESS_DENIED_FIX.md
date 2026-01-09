# 🔒 Netlify "Access Denied" Fix

## Error: Access Denied when trying to deploy

This error can happen for several reasons. Let's fix it!

---

## 🔍 Common Causes & Solutions

### 1. GitHub Repository Permissions

**Problem**: Netlify doesn't have permission to access your GitHub repository.

**Solution**:
1. Go to: https://app.netlify.com
2. Click on your site
3. Go to: **Site settings** → **Build & deploy** → **Continuous deployment**
4. Under "Build settings", click **"Link to a different repository"**
5. Re-authorize GitHub access
6. Select your repository again

---

### 2. Netlify Account Permissions

**Problem**: You might not be the owner of the Netlify site.

**Solution**:
1. Check if you're logged into the correct Netlify account
2. Go to: https://app.netlify.com
3. Check the account name in the top-right corner
4. If wrong account, log out and log in with the correct one

---

### 3. Team/Organization Access

**Problem**: The site belongs to a team and you don't have deploy permissions.

**Solution**:
1. Ask the team owner to give you deploy permissions
2. Or: Transfer the site to your personal account
   - Site settings → General → Transfer site ownership

---

### 4. GitHub App Installation

**Problem**: Netlify's GitHub app isn't installed or authorized.

**Solution**:
1. Go to: https://github.com/settings/installations
2. Find "Netlify"
3. Click "Configure"
4. Make sure your repository is selected
5. Save changes

---

### 5. Deploy Key Issues

**Problem**: SSH deploy key is invalid or expired.

**Solution**:
1. In Netlify: Site settings → Build & deploy → Deploy key
2. Click "Generate new key"
3. Try deploying again

---

## 🔄 Alternative: Create New Site

If nothing works, create a fresh Netlify site:

### Step 1: Delete Old Site (Optional)
1. Go to: https://app.netlify.com
2. Click on your site
3. Site settings → General → Delete site

### Step 2: Create New Site
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize GitHub access
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click "Deploy site"

### Step 3: Add Environment Variables
1. Site settings → Environment variables
2. Add all 5 variables:
   - MONGODB_URI
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - NEXTAUTH_URL (use your new Netlify URL)
   - NEXTAUTH_SECRET

### Step 4: Update Google OAuth
1. Go to Google Cloud Console
2. Update redirect URI with your new Netlify URL
3. Format: `https://your-new-site.netlify.app/api/auth/callback/google`

---

## 🚀 Manual Deploy (Workaround)

If you can't fix permissions, deploy manually:

### Step 1: Build Locally
```bash
cd C:\Users\khana\Desktop\todo-app-main
npm install
npm run build
```

### Step 2: Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

When prompted:
- Choose "Create & configure a new site"
- Follow the prompts
- Publish directory: `.next`

---

## 📋 Checklist

Try these in order:

- [ ] Check you're logged into correct Netlify account
- [ ] Re-link GitHub repository in Netlify
- [ ] Check GitHub app installation permissions
- [ ] Regenerate deploy key
- [ ] Try creating a new Netlify site
- [ ] Try manual deploy via CLI

---

## 🆘 Still Having Issues?

### Check These:

1. **GitHub Repository**:
   - Is it public or private?
   - Do you have admin access?
   - Is it in your personal account or an organization?

2. **Netlify Account**:
   - Are you the site owner?
   - Is your account verified?
   - Any billing issues?

3. **Browser**:
   - Try a different browser
   - Clear cache and cookies
   - Disable browser extensions

---

## 💡 Quick Fix: Use Netlify Drop

**Easiest solution if nothing else works:**

1. Build your app locally:
   ```bash
   cd C:\Users\khana\Desktop\todo-app-main
   npm run build
   ```

2. Go to: https://app.netlify.com/drop
3. Drag and drop the `.next` folder
4. Your site will be deployed instantly!

**Note**: This won't auto-deploy on git push, but it works immediately.

---

## 📞 Contact Netlify Support

If all else fails:
1. Go to: https://www.netlify.com/support/
2. Click "Contact Support"
3. Explain the "Access Denied" error
4. They usually respond within 24 hours

---

**Most common fix**: Re-link your GitHub repository in Netlify settings!
