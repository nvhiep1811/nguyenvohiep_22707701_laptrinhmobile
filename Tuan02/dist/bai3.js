"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectAfterOneSecond = rejectAfterOneSecond;
function rejectAfterOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}
