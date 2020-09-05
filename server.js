const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connect
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// @route   POST api/signin
// @desc    SignIn user
// @access  Public
app.post("/api/signin", signin.handleSignin(bcrypt));

// @route   POST api/register
// @desc    Register user
// @access  Public
app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, bcrypt);
});

// @route   POST api/image
// @desc    Post image details into DB
// @access  Private
app.post(
  "/api/image",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    image.handleImage(req, res);
  }
);

// @route   POST api/imageurl
// @desc    Post image url to Clarifai
// @access  Private
app.post(
  "/api/imageurl",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    image.handleApiCall(req, res);
  }
);

// @route   POST api/imageurl
// @desc    Post image url to Clarifai using base64
// @access  Private
app.post(
  "/api/imageFile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    image.handleApiCallForFile(req, res);
  }
);

const port = process.env.port || 5000;

app.listen(port, () => console.info(`Server running on port ${port}`));
