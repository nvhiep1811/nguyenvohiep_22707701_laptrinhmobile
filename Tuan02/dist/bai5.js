"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateTask = simulateTask;
function simulateTask(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}
simulateTask(1000).then((value) => console.log(value));
