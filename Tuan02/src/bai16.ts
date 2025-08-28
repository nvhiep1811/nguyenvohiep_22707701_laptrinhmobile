import { fn1, fn2, fn3 } from "./bai15";

async function run16() {
    const results = await Promise.all([fn1(), fn2(), fn3()]);
}

run16();