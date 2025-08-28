import { simulateTask } from "./bai5";

var promise1 = simulateTask(1500);
var promise2 = simulateTask(1000);
var promise3 = simulateTask(500);

Promise.all([promise1, promise2, promise3])
        .then((results) => {
            console.log("All Promises resolved:");
            results.forEach((result) => console.log(result));
        });