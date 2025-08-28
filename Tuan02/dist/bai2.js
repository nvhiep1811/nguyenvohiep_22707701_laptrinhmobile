"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAfterOneSecond = resolveAfterOneSecond;
function resolveAfterOneSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
}
