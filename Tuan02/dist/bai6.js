"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai5_1 = require("./bai5");
var promise1 = (0, bai5_1.simulateTask)(1500);
var promise2 = (0, bai5_1.simulateTask)(1000);
var promise3 = (0, bai5_1.simulateTask)(500);
Promise.all([promise1, promise2, promise3])
    .then((results) => {
    console.log("All Promises resolved:");
    results.forEach((result) => console.log(result));
});
