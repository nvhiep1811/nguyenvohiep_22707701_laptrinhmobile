export async function downloadFile(file:string) {
    console.log("Downloading file...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Done!");
        }, 3000);
    })
}