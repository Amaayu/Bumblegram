# 🐝 Bumblegram

A modern social media platform built with Express.js, MongoDB, and EJS templates. Share your moments with the world!

## ✨ Features

- 📸 Photo sharing with Cloudinary integration
- 👤 User profiles and authentication
- ❤️ Like and interact with posts
- 🔍 Search for users
- 📱 Responsive design
- ☁️ Serverless deployment on Netlify

## 🚀 Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Template Engine**: EJS
- **File Upload**: Multer + Cloudinary
- **Session Management**: Express-session with MongoDB store
- **Deployment**: Netlify Functions (Serverless)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Bumblegram

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env
# Edit .env with your credentials
```

## 🔧 Environment Variables

Create a `.env` file with:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 💻 Development

```bash
# Run locally (traditional)
npm start

# Run with Netlify Dev (serverless simulation)
npm run dev
# or
npm run dev:netlify
```

Visit `http://localhost:3000` (traditional) or `http://localhost:8888` (Netlify Dev)

## 🌐 Deployment

```bash
# Deploy to preview
./deploy.sh

# Deploy to production
./deploy.sh prod
```

See [README-NETLIFY.md](./README-NETLIFY.md) for detailed deployment instructions.

## 📁 Project Structure

```
Bumblegram/
├── netlify/functions/     # Serverless functions
├── routes/                # Express routes
├── models/                # Mongoose models
├── views/                 # EJS templates
├── public/                # Static assets
├── service/               # Authentication services
├── app.js                 # Express app
├── netlify.toml          # Netlify config
└── deploy.sh             # Deployment script
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License

---

Made with 💛 by Bumblegram Team
