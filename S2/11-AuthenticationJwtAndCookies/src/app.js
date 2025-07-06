const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try{
    // Validate the signup data
    validateSignUpData(req);

    // Destructuring the request body
    const { firstName, lastName, emailId, password } = req.body;

    // Hashing and Encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password Hash:", passwordHash);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // Saving the user to the database
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    // If there is an error, send a 400 status with the error message
    res.status(400).send("Error saving the user: " + err.message);
  }
});


app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    // Find the user by email
    const user = await User.find({ emailId: emailId });
    if (user.length === 0) {
      return res.status(404).send("Invalid Credentials!");
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid Credentials!");
    }
    // If the password is valid, send a success response
    res.send("Login successful");
  } catch (err) {
    // If there is an error, send a 400 status with the error message
    res.status(400).send("Error during login: " + err.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }

    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Detele a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });