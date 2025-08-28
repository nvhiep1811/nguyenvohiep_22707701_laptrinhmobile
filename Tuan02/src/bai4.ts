export const myPromise = new Promise((resolve, reject) => {
    resolve(Math.floor(Math.random() * 100));
    reject();
})