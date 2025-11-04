# 🚀 Bumblegram Deployment Checklist

## Before Deploying

### 1. ✅ Set Environment Variables in Netlify Dashboard

Go to: **Site settings → Environment variables** and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=bumblegram
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

⚠️ **IMPORTANT**: Without these environment variables, your deployment will fail!

### 2. ✅ MongoDB Atlas Configuration

Make sure your MongoDB Atlas allows connections from anywhere:
- Go to MongoDB Atlas → Network Access
- Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
- This is required for serverless functions

### 3. ✅ Test Locally First

```bash
# Test with Netlify Dev
npm run dev:netlify

# Visit http://localhost:8888
# Test the API: http://localhost:8888/api/hello
```

## Deployment Steps

### First Time Setup

```bash
# 1. Login to Netlify
netlify login

# 2. Initialize your site
netlify init

# 3. Follow the prompts:
#    - Create & configure a new site
#    - Choose your team
#    - Enter site name (e.g., bumblegram-app)
```

### Deploy to Preview

```bash
# Make deploy script executable (first time only)
chmod +x deploy.sh

# Deploy to preview
./deploy.sh
```

### Deploy to Production

```bash
# After testing preview, deploy to production
./deploy.sh prod
```

## Troubleshooting

### Error: "Internal Server Error"

**Check these:**

1. **Environment Variables**: Make sure all env vars are set in Netlify dashboard
2. **MongoDB Connection**: Check if MongoDB allows connections from 0.0.0.0/0
3. **Function Logs**: Check Netlify function logs for detailed errors
   - Go to: Netlify Dashboard → Functions → server → View logs

### Error: "Failed to lookup view"

This means the views directory is not being bundled correctly.
- Already fixed in `netlify.toml` with `included_files`

### Error: "Cannot find module"

This means dependencies are not being bundled.
- Check `package.json` - all dependencies should be in `dependencies`, not `devDependencies`
- Run `npm install` again

### MongoDB Connection Timeout

- Check your MongoDB URI is correct
- Verify MongoDB Atlas network access allows 0.0.0.0/0
- Increase `serverSelectionTimeoutMS` in the connection options

## Viewing Logs

### Function Logs (Production)
```bash
netlify functions:log server
```

### Or in Dashboard:
1. Go to Netlify Dashboard
2. Click on your site
3. Go to **Functions** tab
4. Click on **server** function
5. View logs

## Testing After Deployment

### Test API Endpoint
```bash
curl https://your-site.netlify.app/api/hello
```

Should return:
```json
{
  "message": "Hello from Express on Netlify"
}
```

### Test Main Routes
- Visit: `https://your-site.netlify.app/`
- Should show the signup page

## Common Issues

### Issue: Static files not loading
**Solution**: Make sure `public/` folder is in your repository

### Issue: Session not persisting
**Solution**: Check MongoDB connection and MongoStore configuration

### Issue: Cloudinary uploads failing
**Solution**: Verify Cloudinary environment variables are set correctly

## Production URLs

After deployment, your app will be available at:
- **Production**: `https://your-site-name.netlify.app`
- **Preview**: `https://deploy-preview-XX--your-site-name.netlify.app`

## Need Help?

Check the function logs:
```bash
netlify functions:log server --live
```

Or view in dashboard: **Functions → server → Logs**
