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
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncTask = asyncTask;
exports.batchProcess = batchProcess;
function asyncTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const delay = Math.floor(Math.random() * 2000) + 500;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Task ${id} done in ${delay}ms`);
            }, delay);
        });
    });
}
function batchProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting tasks...");
        const tasks = [1, 2, 3, 4, 5].map((id) => asyncTask(id));
        const results = yield Promise.all(tasks);
        console.log("All tasks completed:");
        results.forEach(result => console.log(result));
    });
}
