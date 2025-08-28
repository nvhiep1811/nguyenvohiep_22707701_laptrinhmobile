async function asyncFunctionOne(): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Async Function One completed.");
            resolve("Result from Function One");
        }, 1000);
    });
}

async function asyncFunctionTwo(): Promise<string> {
return new Promise(resolve => {
    setTimeout(() => {
    console.log("Async Function Two completed.");
    resolve("Result from Function Two");
    }, 500);
});
}

async function asyncFunctionThree(): Promise<string> {
return new Promise(resolve => {
    setTimeout(() => {
    console.log("Async Function Three completed.");
    resolve("Result from Function Three");
    }, 700);
});
}


async function runSequentialAsyncOperations() {
console.log("Starting sequential operations...");

try {
    const resultOne = await asyncFunctionOne();
    console.log(`Received: ${resultOne}`);

    const resultTwo = await asyncFunctionTwo();
    console.log(`Received: ${resultTwo}`);

    const resultThree = await asyncFunctionThree();
    console.log(`Received: ${resultThree}`);

    console.log("All sequential operations completed.");
} catch (error) {
    console.error("An error occurred during sequential operations:", error);
}
}
  
runSequentialAsyncOperations();