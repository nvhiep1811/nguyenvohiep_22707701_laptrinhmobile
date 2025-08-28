export async function asyncTask(id: number): Promise<string> {
    const delay = Math.floor(Math.random() * 2000) + 500;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} done in ${delay}ms`);
        }, delay);
    });
}

export async function batchProcess() {
    console.log("Starting tasks...");
    
    const tasks = [1, 2, 3, 4, 5].map((id) => asyncTask(id));
    const results = await Promise.all(tasks);

    console.log("All tasks completed:");
    results.forEach(result => console.log(result));
}