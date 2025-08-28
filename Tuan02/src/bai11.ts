export async function bai11() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    })
}