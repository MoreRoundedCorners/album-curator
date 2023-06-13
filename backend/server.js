// dependencies
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const AWS = require("aws-sdk");
const userRoutes = require("./routes/userRoutes");
const Playlist = require("./models/Playlist");
const Songs = require("./models/Songs");
const Playlist_songs = require("./models/Playlist_songs");

// load environment variables
dotenv.config();

// create express app
const app = express();

// enable cors
app.use(cors());

// parse json request body
app.use(express.json());

// aws s3 bucket
AWS.config.update({
  region: "us-west-2", // replace with your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3 = new AWS.S3(); // create the S3 object

const songRoutes = require("./routes/songRoutes"); // import the songRoutes after creating the S3 object

// routes
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes(s3)); // make sure the route is accurate

// mysql connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.MYSQL_PASSWORD,
  database: "house-money",
});

// start the server
db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("MySQL connected");
    console.log("AWS configured");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
