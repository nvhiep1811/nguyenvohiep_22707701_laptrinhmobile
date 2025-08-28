var promise10 = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
        if (success) {
            resolve("Success!");
        } else {
            reject("Failure!");
        }
    }, 1000);
})

promise10
    .then(value => {
        console.log(value);
    })
    .catch(error =>{
        console.log(error);
    })
    .finally(() => {
        console.log("Done");
    });