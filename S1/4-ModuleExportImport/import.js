// require ('./module.js'); // Importing the module from other file
// const obj = require('./export.js'); // Importing the object from export.js
// const { x, calculateSum} = require('./export'); // Destructuring

const {calculateSum, calculateMultiply} = require('./calculate'); // Importing functions from calculate/index.js

const data = require('./data.json'); // Importing the JSON

console.log(data);

var a = 10;
var b = 20;

// obj.calculateSum(a, b); // Calling the function from the imported object
// console.log(obj.x); // Accessing the variable from the imported object



calculateSum(a, b);
calculateMultiply(a, b);
// console.log(x);

var name = "Namaste, World!";

console.log(name);

console.log(globalThis === global); // true