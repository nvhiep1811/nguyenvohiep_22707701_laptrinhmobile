"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const bai1_1 = require("./bai1");
const bai10_1 = require("./bai10");
const bai11_1 = require("./bai11");
const bai12_1 = require("./bai12");
const bai13_1 = require("./bai13");
const bai14_1 = require("./bai14");
const bai15_1 = require("./bai15");
const bai18_1 = require("./bai18");
const bai19_1 = require("./bai19");
const bai2_1 = require("./bai2");
const bai21_1 = require("./bai21");
const bai23_1 = require("./bai23");
const bai24_1 = require("./bai24");
const bai25_1 = require("./bai25");
const bai26_1 = require("./bai26");
const bai27_1 = require("./bai27");
const bai28_1 = require("./bai28");
const bai29_1 = require("./bai29");
const bai3_1 = require("./bai3");
const bai30_1 = require("./bai30");
const bai4_1 = require("./bai4");
const bai5_1 = require("./bai5");
const bai9_1 = require("./bai9");
bai1_1.promise.then((value) => {
    console.log("-----Bài 1-----");
    console.log(value);
});
(0, bai2_1.resolveAfterOneSecond)().then((value) => {
    console.log("-----Bài 2-----");
    console.log(value);
});
(0, bai3_1.rejectAfterOneSecond)().catch(error => {
    console.log("-----Bài 3-----");
    console.error("Promise rejected:", error.message);
});
bai4_1.myPromise.then(value => {
    console.log("-----Bài 4-----");
    console.log(value);
}).catch(error => console.log(error));
(0, bai5_1.simulateTask)(1000).then((value) => {
    console.log("-----Bài 5-----");
    console.log(value);
});
var promise1 = (0, bai5_1.simulateTask)(1500);
var promise2 = (0, bai5_1.simulateTask)(1000);
var promise3 = (0, bai5_1.simulateTask)(500);
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
});
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
});
(0, bai9_1.filterEvenArray)([1, 2, 3, 4, 5, 6, 7])
    .then((arr) => {
    return arr.filter(value => value % 2 == 0);
})
    .then(result => {
    console.log("-----Bài 9-----");
    console.log(result);
});
bai10_1.promise10
    .then(value => {
    console.log("-----Bài 10-----");
    console.log(value);
})
    .catch(error => {
    console.log(error);
})
    .finally(() => {
    console.log("Done");
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield (0, bai11_1.bai11)();
    console.log("-----Bài 11-----");
    console.log(result);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, bai12_1.bai12)();
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, bai13_1.bai13)();
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield (0, bai14_1.bai14)(123);
    console.log("-----Bài 14-----");
    console.log(result);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const result1 = yield (0, bai15_1.fn1)();
    console.log(result1);
    const result2 = yield (0, bai15_1.fn2)();
    console.log(result2);
    const result3 = yield (0, bai15_1.fn3)();
    console.log(result3);
}))();
function run16() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield Promise.all([(0, bai15_1.fn1)(), (0, bai15_1.fn2)(), (0, bai15_1.fn3)()]);
        console.log("-----Bài 16-----");
        results.forEach(result => console.log(result));
    });
}
//bai17
function run17() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        console.log("-----Bài 17-----");
        const results = [];
        try {
            for (var _d = true, _e = __asyncValues([(0, bai15_1.fn1)(), (0, bai15_1.fn2)(), (0, bai15_1.fn3)()]), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const result = _c;
                results.push(result);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    });
}
run17();
//bai18
function run18() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, bai18_1.fetchUser)(1);
        console.log("-----Bài 18-----");
        console.log(user);
    });
}
run18();
//bai19
function run19() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, bai19_1.fetchUsers)([1, 2, 3]);
        console.log("-----Bài 19-----");
        console.log(users);
    });
}
run19();
//bai20
function run20() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, bai18_1.fetchUser)(1);
            console.log("-----Bài 20-----");
            console.log(user);
        }
        catch (error) {
            console.error(error);
        }
    });
}
run20();
//bai21
function run21(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, bai21_1.fetchData)(link);
        console.log("-----Bài 21-----");
        console.log(data);
    });
}
run21("https://jsonplaceholder.typicode.com/todos/1");
//bai22
function run22() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("-----Bài 22-----");
        for (var i = 0; i < 5; i++) {
            const data = yield (0, bai21_1.fetchData)("https://jsonplaceholder.typicode.com/todos/1");
            console.log(data);
        }
    });
}
run22();
//bai23
(0, bai23_1.fetchTodos)("https://jsonplaceholder.typicode.com/todos").then(completedTodos => {
    console.log("-----Bài 23-----");
    console.log(completedTodos);
});
//bai24
(0, bai24_1.postData)({ userId: 10, id: 196, title: "Data cua Nguyen Vo Hiep", completed: true }).then(response => {
    console.log("-----Bài 24-----");
    console.log(response);
});
//bai25
(() => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, bai25_1.downloadFile)("download.txt");
    console.log(result);
}))();
//bai26
(() => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, bai26_1.waitFor)();
    console.log(result);
}))();
//bai27
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, bai27_1.fetchWithRetry)("https://jsonplaceholder.typicode.com/todos/1", 3);
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}))();
//bai28
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bai28_1.batchProcess)(); }))();
//bai29
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bai29_1.queueProcess)(); }))();
//bai30
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = [
            "https://jsonplaceholder.typicode.com/todos/1",
            "https://jsonplaceholder.typicode.com/todos/2",
            "https://jsonplaceholder.typicode.com/todos/3"
        ];
        yield (0, bai30_1.fetchMultipleURLs)(urls);
    }
    catch (error) {
        console.log("Error:", error);
    }
}))();
