"use strict";
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1 resolved'), 500);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1 resolved'), 500);
});
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1 resolved'), 500);
});
Promise.race([promise1, promise2, promise3])
    .then(value => {
    console.log('The first settled promise:', value);
});
