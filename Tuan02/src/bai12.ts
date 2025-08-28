import { simulateTask } from "./bai5";

export async function bai12() {
    let value = await simulateTask(1000);
    console.log("-----Bài 12-----");
    console.log(value);
}