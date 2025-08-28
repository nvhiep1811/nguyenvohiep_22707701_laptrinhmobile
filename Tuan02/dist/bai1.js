"use strict";
let promise = new Promise(function (resolve) {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
promise.then((value) => {
    console.log(value);
});
