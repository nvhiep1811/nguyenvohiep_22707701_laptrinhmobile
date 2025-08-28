function rejectAfterOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

rejectAfterOneSecond().catch(error => {
    console.error("Promise rejected:", error.message);
});