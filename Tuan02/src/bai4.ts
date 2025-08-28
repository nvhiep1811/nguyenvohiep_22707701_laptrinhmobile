var myPromise = new Promise((resolve, reject) => {
    resolve(Math.random());
    reject();
})

myPromise.then(value => console.log(value))
        .catch(error => console.log(error));