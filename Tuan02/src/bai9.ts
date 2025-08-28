export function filterEvenArray(arr: number[]) {
    return new Promise <number[]> ((resolve, reject) => {
        setTimeout(() => {
            resolve(arr);
        }, 1000);
    });
}