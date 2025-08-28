import { asyncTask } from "./bai28";

export async function queueProcess() {
    const tasks = [1, 2, 3, 4, 5].map((id) => asyncTask(id));
    for (const task of tasks) {
        const result = await task;
        console.log(result);
    }
}