const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.registerUser = async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    console.log("password: ", req.body.password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      hashed_password: hashedPassword,
    });
    console.log("newUser created: ", newUser);

    // Generate the JWT token
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the JWT token and user information
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.hashed_password
    );

    if (user && isPasswordValid) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
      });

      // Include the user object in the response
      res.status(200).json({ token, refreshToken, user: user.toJSON() });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error Signing in user:", error);
    res.status(500).json({ error: "Error Signing in user" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ where: { email: decoded.email } });
    if (!req.user) {
      throw new Error("User not found");
    }
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(401).json({ error: "Not authorized" });
  }
};

exports.getUserFromToken = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "No user found" });
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error getting user from token:", error);
    res.status(500).json({ error: "Error getting user from token" });
  }
};
