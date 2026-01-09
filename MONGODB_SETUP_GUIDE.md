# 🗄️ MongoDB Atlas Setup Guide

## How to Check IP Whitelist and Database User Permissions

---

## 📍 Step 1: Check IP Whitelist (Network Access)

### Go to MongoDB Atlas:
1. Open: https://cloud.mongodb.com
2. Sign in to your account
3. Select your project (if you have multiple)

### Check Network Access:
1. Click **"Network Access"** in the left sidebar (under "Security")
2. You should see a list of IP addresses

### What You Need:
**Option 1: Allow All IPs (Recommended for Netlify)**
- Look for an entry with IP: `0.0.0.0/0`
- Status should be: **Active** (green)
- If you don't see this, add it:
  1. Click **"Add IP Address"** button
  2. Click **"Allow Access from Anywhere"**
  3. Click **"Confirm"**

**Option 2: Specific Netlify IPs**
- If you prefer specific IPs, you need to add Netlify's IP ranges
- But `0.0.0.0/0` is easier and works for all deployments

### Screenshot Reference:
```
Network Access
┌─────────────────────────────────────────────┐
│ IP Address        │ Comment    │ Status     │
├─────────────────────────────────────────────┤
│ 0.0.0.0/0        │ Allow All  │ ● Active   │
└─────────────────────────────────────────────┘
```

---

## 👤 Step 2: Check Database User Permissions

### Go to Database Access:
1. In MongoDB Atlas, click **"Database Access"** in the left sidebar (under "Security")
2. You should see a list of database users

### Check Your User:
Look for the user you're using in your connection string.

**Example**: If your connection string is:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/todoapp
```
Then your username is: `myuser`

### Required Permissions:
Your user should have one of these roles:
- ✅ **"Atlas admin"** (full access - easiest)
- ✅ **"Read and write to any database"**
- ✅ **Custom role with read/write on your specific database**

### How to Check/Fix:
1. Find your user in the list
2. Look at the **"Database User Privileges"** column
3. If it says "Read and write to any database" or "Atlas admin" → ✅ You're good!
4. If not, click **"Edit"** button:
   - Under "Database User Privileges"
   - Select **"Read and write to any database"**
   - Click **"Update User"**

### Screenshot Reference:
```
Database Access
┌──────────────────────────────────────────────────────────┐
│ Username  │ Authentication │ Database User Privileges    │
├──────────────────────────────────────────────────────────┤
│ myuser    │ Password       │ Read and write to any DB ✓ │
└──────────────────────────────────────────────────────────┘
```

---

## 🔗 Step 3: Get Your Connection String

### From MongoDB Atlas:
1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Copy the connection string

### Format:
```
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/<database>?retryWrites=true&w=majority
```

### Replace:
- `<username>` → Your database username
- `<password>` → Your database password (NOT your MongoDB Atlas login password!)
- `<database>` → Your database name (e.g., `todoapp`)

### Example:
```
mongodb+srv://myuser:MySecurePass123@cluster0.abc123.mongodb.net/todoapp?retryWrites=true&w=majority
```

---

## ✅ Quick Checklist

### Network Access (IP Whitelist):
- [ ] Go to: MongoDB Atlas → Network Access
- [ ] Check for: `0.0.0.0/0` with Active status
- [ ] If missing: Add IP Address → Allow Access from Anywhere

### Database Access (User Permissions):
- [ ] Go to: MongoDB Atlas → Database Access
- [ ] Find your user
- [ ] Check privileges: "Read and write to any database" or "Atlas admin"
- [ ] If wrong: Edit → Change privileges → Update User

### Connection String:
- [ ] Go to: Database → Connect → Connect your application
- [ ] Copy connection string
- [ ] Replace `<username>`, `<password>`, `<database>`
- [ ] Add to Netlify as `MONGODB_URI` environment variable

---

## 🔍 Common Issues

### Issue: "IP not whitelisted"
**Solution**: Add `0.0.0.0/0` to Network Access

### Issue: "Authentication failed"
**Solution**: 
1. Check username/password in connection string
2. Make sure you're using the DATABASE user password, not your Atlas login password
3. Check user has correct permissions in Database Access

### Issue: "Cannot connect to database"
**Solution**:
1. Verify connection string format
2. Check database name is correct
3. Ensure cluster is running (not paused)

---

## 📸 Visual Guide

### Where to Find Everything:

```
MongoDB Atlas Dashboard
├── 🔒 Security
│   ├── Network Access ← Check IP whitelist here
│   └── Database Access ← Check user permissions here
├── 💾 Database
│   └── Connect ← Get connection string here
└── ⚙️ Settings
```

---

## 🎯 Final Verification

After setting up, verify your connection string works:

1. **Format Check**:
   ```
   mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]
   ```

2. **No Placeholders**: Make sure you replaced ALL `<...>` with actual values

3. **Special Characters**: If your password has special characters, they might need URL encoding:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`

4. **Test**: Add to Netlify environment variables and deploy

---

## 🚀 Next Steps

After configuring MongoDB:

1. ✅ IP Whitelist: `0.0.0.0/0` added
2. ✅ User Permissions: "Read and write to any database"
3. ✅ Connection String: Copied and updated
4. ✅ Add to Netlify: Environment variable `MONGODB_URI`
5. ✅ Deploy: Push code to GitHub
6. ✅ Test: Try signing in and adding tasks

---

**Need help?** Check the MongoDB Atlas documentation or contact their support!
