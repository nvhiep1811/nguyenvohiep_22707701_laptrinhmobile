export async function fn1() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Result from fn1");
        }, 1500);
    });
}
export async function fn2() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Result from fn2");
        }, 500);
    });
}
export async function fn3() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Result from fn3");
        }, 1000);
    });
}


async function run15() {
    const result1 = await fn1();
    console.log(result1);

    const result2 = await fn2();
    console.log(result2);

    const result3 = await fn3();
    console.log(result3);
}
  
run15();