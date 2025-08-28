import { fn1, fn2, fn3 } from "./bai15";

async function run17() {
    const results = [];
    for await (const result of [fn1(), fn2(), fn3()]) {
        results.push(result);
    }
    return results;
}

run17();