const express = require('express');

const app = express();


app.use("/", (req, res) => {
    res.send("<h1>Welcome to Express Server</h1>");
});

// This route will match any path that starts with /user. For example, /user, /user/123, /user/profile, etc.
// app.use("/user", (req, res)=>{
//     res.send("No Way Boy!")
// })  //Order of middleware matters, so this will be executed before the specific routes below.

app.get("/user", (req, res)=>{
    res.send({name: "Gaurav Upadhyay", age: 25, city: "New Delhi"});
})

app.post("/user", (req, res)=>{
    console.log(req.body)
    // Write your logic here to save the user data to the database
    res.send("User data saved successfully");
})

app.put("/user", (req, res)=>{
    console.log(req.body)
    // Write your logic here to update the user data in the database
    res.send("User data updated successfully");
})

app.delete("/user", (req, res)=>{
    // Write your logic here to delete the user data from the database
    res.send("User data deleted successfully");
})

app.use("/hello",(req, res) =>{
    res.send("<h1>Hello World</h1>");
})

app.get("/.*fly$/", (req, res) => {
    const name = req.params.name;  
    res.send(`<h1>Hello ${name}</h1>`);
});

app.get("/user/:userId/:name/:password", (req, res) => {
    // const name = req.params.name;  
    console.log(req.params);
    const { userId, name, password } = req.params;
    res.send(`<h1>Hello ${name}</h1>`);
});

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})