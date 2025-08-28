export const promise = new Promise(function(resolve) {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
})