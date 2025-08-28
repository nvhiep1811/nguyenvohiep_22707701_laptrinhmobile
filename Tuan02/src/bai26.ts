export async function waitFor() {
    console.log("Waiting for 5s...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Waited!");
        }, 5000);
    });
}