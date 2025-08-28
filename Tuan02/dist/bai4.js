"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPromise = void 0;
exports.myPromise = new Promise((resolve, reject) => {
    resolve(Math.floor(Math.random() * 100));
    reject();
});
