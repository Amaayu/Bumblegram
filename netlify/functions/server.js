const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const indexRouter = require("../../routes/index");
const usersRouter = require("../../routes/users");

const app = express();

// View engine setup - handle both local dev and production
const viewsPath = process.env.NETLIFY_DEV 
  ? path.join(process.cwd(), "views")
  : path.join(__dirname, "../../views");
app.set("views", viewsPath);
app.set("view engine", "ejs");

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB (with connection pooling for serverless)
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  cachedDb = connection;
  console.log("DB connected");
  return connection;
}

// Initialize DB connection
connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error);
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cookieParser());

// Static files - handle both local dev and production
const publicPath = process.env.NETLIFY_DEV
  ? path.join(process.cwd(), "public")
  : path.join(__dirname, "../../public");
app.use(express.static(publicPath));
app.use(
  session({
    secret: " lolo poop jay",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

// Sample API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Netlify" });
});

// Your existing routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 handler
app.use(function (req, res, next) {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  
  // Check if error view exists, otherwise send JSON
  try {
    res.render("error");
  } catch (viewError) {
    res.json({ 
      error: err.message,
      status: err.status || 500 
    });
  }
});

// Export the serverless function
module.exports.handler = serverless(app);
