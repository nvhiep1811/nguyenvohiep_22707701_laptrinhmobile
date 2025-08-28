export function simulateTask(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    })
}

simulateTask(1000).then((value) => console.log(value));                    