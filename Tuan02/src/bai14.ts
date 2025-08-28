async function bai14(value: number): Promise<Number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value * 3);
        }, 1000);
    });    
}

bai14(123);