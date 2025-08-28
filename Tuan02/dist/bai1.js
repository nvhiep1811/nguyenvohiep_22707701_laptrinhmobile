"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = void 0;
exports.promise = new Promise(function (resolve) {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
