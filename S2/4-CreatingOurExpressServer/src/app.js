const express = require('express');

const app = express();


app.get("/", (req, res) => {
    res.send("<h1>Welcome to Express Server</h1>");
});

app.use("/hello",(req, res) =>{
    res.send("<h1>Hello World</h1>");
})

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})