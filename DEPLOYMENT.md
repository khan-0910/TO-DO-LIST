# Deployment Guide - Netlify

This guide will walk you through deploying your Task Manager application to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://netlify.com))
- A GitHub account (recommended for continuous deployment)
- MongoDB Atlas account for database
- Google OAuth credentials

## Step 1: Prepare Your Environment Variables

Before deploying, you need to set up the following environment variables:

### Required Environment Variables:

1. **MONGODB_URI**: Your MongoDB connection string
2. **NEXTAUTH_URL**: Your production URL (e.g., `https://your-app.netlify.app`)
3. **NEXTAUTH_SECRET**: A random secret string (generate one using: `openssl rand -base64 32`)
4. **GOOGLE_CLIENT_ID**: Your Google OAuth Client ID
5. **GOOGLE_CLIENT_SECRET**: Your Google OAuth Client Secret

## Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Netlify
5. Get your connection string
6. Replace `<password>` with your database user password

## Step 3: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `https://your-app.netlify.app/api/auth/callback/google`
6. Save your Client ID and Client Secret

## Step 4: Deploy to Netlify

### Option A: Deploy via Netlify CLI (Recommended)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Navigate to your project:
```bash
cd C:/Users/khana/Desktop/todo-app-main
```

3. Login to Netlify:
```bash
netlify login
```

4. Initialize your site:
```bash
netlify init
```

5. Follow the prompts:
   - Create & configure a new site
   - Choose your team
   - Enter a site name (or leave blank for random)
   - Build command: `npm run build`
   - Publish directory: `.next`

6. Set environment variables:
```bash
netlify env:set MONGODB_URI "your_mongodb_connection_string"
netlify env:set NEXTAUTH_URL "https://your-app.netlify.app"
netlify env:set NEXTAUTH_SECRET "your_generated_secret"
netlify env:set GOOGLE_CLIENT_ID "your_google_client_id"
netlify env:set GOOGLE_CLIENT_SECRET "your_google_client_secret"
```

7. Deploy:
```bash
netlify deploy --prod
```

### Option B: Deploy via Netlify Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

2. Go to [Netlify Dashboard](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Show advanced" and add environment variables
7. Click "Deploy site"

## Step 5: Configure Environment Variables in Netlify Dashboard

1. Go to your site in Netlify Dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add all required variables:
   - `MONGODB_URI`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## Step 6: Update Google OAuth Redirect URI

1. Go back to Google Cloud Console
2. Update your OAuth credentials with the actual Netlify URL
3. Add: `https://your-actual-site.netlify.app/api/auth/callback/google`

## Step 7: Test Your Deployment

1. Visit your Netlify URL
2. Test the sign-in functionality
3. Create, edit, and delete tasks
4. Test drag-and-drop functionality
5. Toggle dark mode
6. Test on mobile devices

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version (should be 18+)

### Authentication Issues
- Verify all environment variables are set correctly
- Check Google OAuth redirect URIs match exactly
- Ensure NEXTAUTH_URL matches your Netlify domain

### Database Connection Issues
- Verify MongoDB connection string is correct
- Check if IP whitelist includes 0.0.0.0/0
- Ensure database user has proper permissions

### API Routes Not Working
- Verify `netlify.toml` is in the root directory
- Check that Next.js plugin is installed
- Review function logs in Netlify dashboard

## Continuous Deployment

Once connected to GitHub, Netlify will automatically deploy when you push changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Custom Domain (Optional)

1. Go to "Domain settings" in Netlify
2. Click "Add custom domain"
3. Follow the instructions to configure DNS
4. Update `NEXTAUTH_URL` environment variable
5. Update Google OAuth redirect URIs

## Performance Optimization

- Enable Netlify's CDN (automatic)
- Use Netlify's image optimization
- Enable HTTP/2 and Brotli compression (automatic)
- Monitor performance in Netlify Analytics

## Security Best Practices

1. Never commit `.env.local` to Git
2. Rotate secrets regularly
3. Use strong, unique passwords for MongoDB
4. Enable 2FA on all accounts
5. Monitor access logs

## Support

If you encounter issues:
- Check [Netlify Documentation](https://docs.netlify.com/)
- Review [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Check MongoDB Atlas connection issues
- Verify Google OAuth setup

## Useful Commands

```bash
# View deployment logs
netlify logs

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin

# Check environment variables
netlify env:list

# Redeploy site
netlify deploy --prod
```

---

**Congratulations!** Your Task Manager is now live on Netlify! 🎉
