async function bai11() {
    let promise = new Promise(function(resolve) {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    })

    let value = await promise;
    console.log(value);
}

bai11();