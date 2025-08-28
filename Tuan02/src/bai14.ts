async function bai14(value: number): Promise<Number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value * 3);
        }, 1000);
    });    
}

async function run() {
    let result = await bai14(123);
    console.log(result);
}

run();