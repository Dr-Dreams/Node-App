const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// JWT secret key
const secretKey = "key";
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: " api is working....",
  });
});

app.listen(3031, () => {
  console.log("listening on http://localhost:3031");
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// // Load user data from JSON file
let users = [];
fs.readFile("./data/users.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    users = JSON.parse(data);
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by username
  const user = await users.find((u) => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    // Generate JWT token
    const token = jwt.sign(
      { email },
      secretKey,
      { expiresIn: "60s" },
      (err, token) => {
        if (err) res.status(401).json({ message: "Something went wrong" });
        res.status(200).json({ email, auth: token });
      }
    );

    // res.status(200).json({ message: 'Login successful', token });
  } else {
    res.status(404).json({ message: "Please Check your email and password!" });
  }
});

// Signup API
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    res.status(409).json({ message: "Username already exists" });
  } else {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user object
    const newUser = { name, email, password: hashedPassword };

    // Add the user to the array
    users.push(newUser);

    // Save user data to JSON file
    fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res
          .status(403)
          .json({ message: "something went wrong please try again" });
      }
    });
    const token = jwt.sign(
      { email },
      secretKey,
      { expiresIn: "60s" },
      (err, token) => {
        if (err) res.status(401).json({ message: "Something went wrong" });
        res.status(200).json({ email, auth: token });
      }
    );
  }
});

// Verify JWT token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

// Protected route example
app.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed", user: req.user });
});

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
