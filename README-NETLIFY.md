# Bumblegram - Express.js on Netlify Functions - Deployment Guide

## 📁 Project Structure

```
your-project/
├── netlify/
│   └── functions/
│       └── server.js          # Serverless Express wrapper
├── routes/                     # Your Express routes
│   ├── index.js
│   └── users.js
├── models/                     # Mongoose models
│   ├── user.js
│   └── post.js
├── views/                      # EJS templates
│   ├── index.ejs
│   ├── feed.ejs
│   └── ...
├── public/                     # Static files
│   ├── images/
│   ├── stylesheets/
│   └── test-api.html          # API test page
├── service/                    # Auth services
│   └── auth.js
├── app.js                      # Original Express app
├── netlify.toml               # Netlify configuration
├── deploy.sh                  # Deployment script
├── package.json
└── .env                       # Environment variables
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install the new dependencies:
- `serverless-http` - Wraps Express for serverless
- `netlify-cli` - For local development and deployment

### 2. Environment Variables

Make sure your `.env` file is configured (already done):
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** Add these same environment variables to Netlify:
- Go to your Netlify dashboard
- Site settings → Environment variables
- Add all variables from your `.env` file

### 3. Local Development

Run locally with Netlify Dev (simulates serverless environment):

```bash
npm run dev
```

Or use the traditional method:

```bash
npm start
```

### 4. Test the API

Open `http://localhost:3000/test-api.html` in your browser and click the button to test the `/api/hello` endpoint.

Or use curl:

```bash
curl http://localhost:8888/.netlify/functions/server/api/hello
```

## 📤 Deployment

### First Time Setup

1. Install Netlify CLI globally (if not already installed):
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize your site:
```bash
netlify init
```

### Deploy to Preview

```bash
npm run deploy
# or
./deploy.sh
```

### Deploy to Production

```bash
npm run deploy:prod
# or
./deploy.sh prod
```

## 🔌 API Usage

### From Frontend (Fetch Example)

```javascript
// Call the sample API endpoint
async function callAPI() {
  try {
    const response = await fetch('/.netlify/functions/server/api/hello');
    const data = await response.json();
    console.log(data); // { message: "Hello from Express on Netlify" }
  } catch (error) {
    console.error('API Error:', error);
  }
}

// Call any existing route
async function getFeed() {
  try {
    const response = await fetch('/.netlify/functions/server/feed');
    const html = await response.text();
    // Handle response
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### URL Patterns

- Local development: `http://localhost:8888/.netlify/functions/server/your-route`
- Production: `https://your-site.netlify.app/.netlify/functions/server/your-route`

Thanks to the redirects in `netlify.toml`, you can also use:
- `/api/hello` → redirects to `/.netlify/functions/server/api/hello`
- `/feed` → redirects to `/.netlify/functions/server/feed`

## ⚙️ Configuration Details

### netlify.toml

The configuration file handles:
- Build command and function directory
- URL redirects (all routes go through the serverless function)
- Local dev server settings

### serverless-http

Wraps your Express app to work in AWS Lambda (which Netlify Functions use). It handles:
- Request/response transformation
- Binary data encoding
- Proper HTTP status codes

## 🔍 Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) for serverless
- Check that environment variables are set in Netlify dashboard

### Cold Starts
- First request may be slow (3-5 seconds) due to Lambda cold start
- Subsequent requests will be faster
- Consider using MongoDB connection pooling (already implemented)

### File Uploads
- Cloudinary configuration should work as-is
- Ensure environment variables are set correctly

### Session Issues
- Sessions work with MongoDB store (already configured)
- Make sure MongoStore is properly connected

## 📝 Notes

- The original `app.js` is kept for local development
- `netlify/functions/server.js` is used for production deployment
- Static files in `public/` are served directly by Netlify CDN
- EJS templates are bundled with the function

## 🎯 Next Steps

1. Test locally with `npm run dev`
2. Deploy to preview with `npm run deploy`
3. Test the preview URL
4. Deploy to production with `npm run deploy:prod`
5. Update your frontend to use the new API endpoints

Happy deploying! 🚀
