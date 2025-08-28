import { fetchData } from "./bai21";

async function run22() {
    for (var i = 0; i < 5; i++) {
        const data = await fetchData("https://jsonplaceholder.typicode.com/todos/1");
        console.log(data);
    }
}

run22();
    