console.log("Sum module Executed");

var x = "Hello, Module!";

function calculateSum(a, b) {
    const sum = a + b;

    console.log(sum)
}


// Old way of exporting
// module.exports = {
//     x: x,
//     calculateSum: calculateSum
// }

// New way of exporting
// console.log(module.exports) // {}
// module.exports.x = x; 
// module.exports.calculateSum = calculateSum;

module.exports = { x, calculateSum };