"use strict";
function filterEvenArray(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(arr);
        }, 1000);
    });
}
filterEvenArray([1, 2, 3, 4, 5, 6, 7])
    .then((arr) => {
    return arr.filter(value => value % 2 == 0);
})
    .then(result => {
    console.log(result);
});
