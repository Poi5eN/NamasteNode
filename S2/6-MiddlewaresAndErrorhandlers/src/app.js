const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.message);
  res.status(500).send("Internal Server Error");
});  // This middleware will catch errors from the routes below BUT still try catch is recommended in routes to handle errors gracefully

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});

// const express = require("express");

// const app = express();

// // app.use("/", (req, res) => {
// //   res.send("<h1>Welcome to Express Server</h1>");
// // });

// /*
// app.get("/user", (req, res)=>{
//     // res.send({name: "Gaurav Upadhyay", age: 25, city: "New Delhi"});
//     // console.log("User route hit");
//     // res.json({name: "Gaurav Upadhyay", age: 25, city: "New Delhi"});
//     // WITHOUT THIS LINE ABOVE, THE SERVER WILL NOT RESPOND AND WILL HANG EVEN IF THE REQUEST IS MADE AND HAVE CONSOLE LOGS
// })*/

// // app.use(
// //   "/user",
// //   (req, res) => {
// //     console.log("User route hit 1");
// //     // res.send({ name: "Gaurav Upadhyay", age: 25, city: "New Delhi" });
// //     next();
// //     // 1- This line is crucial to pass control to the next middleware
// //   },
// //   (req, res) => {
// //     console.log("User route hit 2");
// //     res.send({ name: "Gaurav Upadhyay", age: 25, city: "New Delhi" });
// //   }
// // );

// app.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });
