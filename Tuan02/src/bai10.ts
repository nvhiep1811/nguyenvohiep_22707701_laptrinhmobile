export const promise10 = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
        if (success) {
            resolve("Success!");
        } else {
            reject("Failure!");
        }
    }, 1000);
})