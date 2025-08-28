import { promise } from "./bai1";
import { promise10 } from "./bai10";
import { bai11 } from "./bai11";
import { bai12 } from "./bai12";
import { bai13 } from "./bai13";
import { bai14 } from "./bai14";
import { fn1, fn2, fn3 } from "./bai15";
import { fetchUser } from "./bai18";
import { fetchUsers } from "./bai19";
import { resolveAfterOneSecond } from "./bai2";
import { fetchData } from "./bai21";
import { fetchTodos } from "./bai23";
import { postData } from "./bai24";
import { downloadFile } from "./bai25";
import { waitFor } from "./bai26";
import { fetchWithRetry } from "./bai27";
import { batchProcess } from "./bai28";
import { queueProcess } from "./bai29";
import { rejectAfterOneSecond } from "./bai3";
import { fetchMultipleURLs } from "./bai30";
import { myPromise } from "./bai4";
import { simulateTask } from "./bai5";
import { filterEvenArray } from "./bai9";


promise.then((value) => {
        console.log("-----Bài 1-----");
        console.log(value); 
    }
);

resolveAfterOneSecond().then((value) => {
    console.log("-----Bài 2-----");
    console.log(value)
});

rejectAfterOneSecond().catch(error => {
    console.log("-----Bài 3-----");
    console.error("Promise rejected:", error.message);
});



myPromise.then(value => {
            console.log("-----Bài 4-----");
            console.log(value);
        }).catch(error => console.log(error));



simulateTask(1000).then((value) => {
    console.log("-----Bài 5-----");
    console.log(value);
});

var promise1 = simulateTask(1500);
var promise2 = simulateTask(1000);
var promise3 = simulateTask(500);

Promise.all([promise1, promise2, promise3])
        .then((results) => {
            console.log("-----Bài 6-----");
            console.log("All Promises resolved:");
            results.forEach((result) => console.log(result));
        });

const prm1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1 resolved'), 500);
});

const prm2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1 resolved'), 500);
});

const prm3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1 resolved'), 500);
});

Promise.race([prm1, prm2, prm3])
        .then(value => {
            console.log("-----Bài 7-----");
            console.log('The first settled promise:', value);
        })

Promise.resolve(2)
        .then((value) => {
            console.log("-----Bài 8-----");
            return value * value;
        })
        .then((value) => {
            return value * 2;
        })
        .then((value) => {
            return value + 5;
        })
        .then((result) => {
            console.log(result);
        })



filterEvenArray([1, 2, 3, 4, 5, 6, 7])
    .then((arr) => {
        return arr.filter(value => value % 2 == 0)
    })
    .then(result => {
        console.log("-----Bài 9-----");
        console.log(result);
    })


promise10
    .then(value => {
        console.log("-----Bài 10-----");
        console.log(value);
    })
    .catch(error =>{
        console.log(error);
    })
    .finally(() => {
        console.log("Done");
    });

(async () => {
    let result = await bai11();
    console.log("-----Bài 11-----");
    console.log(result);
})();

(async () => {
    await bai12();
})();

(async () => {
    bai13();
})();

(async () => {
    let result = await bai14(123);
    console.log("-----Bài 14-----");
    console.log(result);
})();
  
(async () => {
    const result1 = await fn1();
    console.log(result1);

    const result2 = await fn2();
    console.log(result2);

    const result3 = await fn3();
    console.log(result3);
})();

async function run16() {
    const results = await Promise.all([fn1(), fn2(), fn3()]);
    console.log("-----Bài 16-----");
    results.forEach(result => console.log(result));
}

//bai17
async function run17() {
    console.log("-----Bài 17-----");

    const results = [];
    for await (const result of [fn1(), fn2(), fn3()]) {
        results.push(result);
    }
    return results;
}

run17();

//bai18
async function run18() {
    const user = await fetchUser(1);
    console.log("-----Bài 18-----");
    console.log(user);
}

run18();

//bai19
async function run19() {
    const users = await fetchUsers([1, 2, 3]);
    console.log("-----Bài 19-----");
    console.log(users);
}

run19();

//bai20
async function run20() {
    try {
        const user = await fetchUser(1);
        console.log("-----Bài 20-----");
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}

run20();

//bai21
async function run21(link:string) {
    const data = await fetchData(link);
    console.log("-----Bài 21-----");
    console.log(data);
}
run21("https://jsonplaceholder.typicode.com/todos/1");

//bai22
async function run22() {
        console.log("-----Bài 22-----");
    for (var i = 0; i < 5; i++) {
        const data = await fetchData("https://jsonplaceholder.typicode.com/todos/1");
        console.log(data);
    }
}
run22();

//bai23
fetchTodos("https://jsonplaceholder.typicode.com/todos").then(completedTodos => {
    console.log("-----Bài 23-----");
    console.log(completedTodos);
});

//bai24
postData({ userId: 10, id: 196, title: "Data cua Nguyen Vo Hiep", completed: true }).then(response => {
    console.log("-----Bài 24-----");
    console.log(response);
});

//bai25
(async () => {
    const result = await downloadFile("download.txt");
    console.log(result);
})();


//bai26
(async () => {
    const result = await waitFor();
    console.log(result);
})();

//bai27
(async () => {
    try {
        const result = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
        console.log(result);
    } catch (error) {
        console.error(error);
        
    }
})();

//bai28
(async () => await batchProcess())();

//bai29
(async () => await queueProcess())();

//bai30
(async () => {
    try {
        const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/todos/3"
        ];
        await fetchMultipleURLs(urls);
    } catch (error) {
        console.log("Error:", error);
    }
})();