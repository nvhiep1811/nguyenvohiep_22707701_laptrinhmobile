"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEvenArray = filterEvenArray;
function filterEvenArray(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(arr);
        }, 1000);
    });
}
