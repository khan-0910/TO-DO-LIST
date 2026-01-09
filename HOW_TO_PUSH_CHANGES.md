# 🚀 How to Push Changes to GitHub and Deploy

## Option 1: Using Git Commands (Recommended)

### Step 1: Open Terminal in Your Project
1. Open Command Prompt or PowerShell
2. Navigate to your project:
   ```cmd
   cd C:\Users\khana\Desktop\todo-app-main
   ```

### Step 2: Check Git Status
```cmd
git status
```
This shows all the files that have changed.

### Step 3: Add All Changes
```cmd
git add .
```
This stages all your changes for commit.

### Step 4: Commit Changes
```cmd
git commit -m "Fix Netlify configuration and add redirects file"
```

### Step 5: Push to GitHub
```cmd
git push
```

If this is your first push or you get an error, use:
```cmd
git push origin main
```

Or if your branch is named "master":
```cmd
git push origin master
```

### Step 6: Wait for Netlify
- Netlify will automatically detect the push
- It will start building and deploying
- Wait 2-3 minutes
- Check your site: https://khanstodolist.netlify.app

---

## Option 2: Using GitHub Desktop (If Installed)

1. Open GitHub Desktop
2. Select your repository (todo-app-main)
3. You'll see all changed files on the left
4. Write a commit message: "Fix Netlify configuration"
5. Click "Commit to main" (or "Commit to master")
6. Click "Push origin" at the top
7. Wait for Netlify to deploy

---

## Option 3: Manual Upload to Netlify (No Git Required)

If Git isn't working, you can manually deploy:

1. Go to: https://app.netlify.com
2. Click on your site (khanstodolist)
3. Go to "Deploys" tab
4. Scroll down to "Need to update your site?"
5. Drag and drop the entire `todo-app-main` folder
6. Wait for deployment to complete

---

## After Pushing/Deploying

### Still Need to Do:

1. **Fix NEXTAUTH_SECRET** (in Netlify dashboard):
   - Go to: https://generate-secret.vercel.app/32
   - Copy the generated secret
   - Netlify → Site settings → Environment variables
   - Update `NEXTAUTH_SECRET` with the new secret
   - Trigger redeploy

2. **Update Google OAuth**:
   - Go to: https://console.cloud.google.com
   - APIs & Services → Credentials
   - Update redirect URI to: `https://khanstodolist.netlify.app/api/auth/callback/google`
   - Update JavaScript origin to: `https://khanstodolist.netlify.app`
   - Save

3. **Test**:
   - Wait 2-3 minutes
   - Clear browser cache
   - Go to: https://khanstodolist.netlify.app
   - Try signing in

---

## Troubleshooting

### "Git is not recognized"
Git might not be installed. Use Option 3 (Manual Upload) instead.

### "Permission denied"
You might need to authenticate with GitHub:
```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### "No remote repository"
Your project might not be connected to GitHub yet. Use Option 3 (Manual Upload) instead.

---

## Quick Commands Summary

```cmd
cd C:\Users\khana\Desktop\todo-app-main
git add .
git commit -m "Fix Netlify configuration"
git push
```

That's it! Netlify will automatically deploy your changes.
