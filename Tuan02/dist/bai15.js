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
function asyncFunctionOne() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Async Function One completed.");
                resolve("Result from Function One");
            }, 1000);
        });
    });
}
function asyncFunctionTwo() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Async Function Two completed.");
                resolve("Result from Function Two");
            }, 500);
        });
    });
}
function asyncFunctionThree() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Async Function Three completed.");
                resolve("Result from Function Three");
            }, 700);
        });
    });
}
function runSequentialAsyncOperations() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting sequential operations...");
        try {
            const resultOne = yield asyncFunctionOne();
            console.log(`Received: ${resultOne}`);
            const resultTwo = yield asyncFunctionTwo();
            console.log(`Received: ${resultTwo}`);
            const resultThree = yield asyncFunctionThree();
            console.log(`Received: ${resultThree}`);
            console.log("All sequential operations completed.");
        }
        catch (error) {
            console.error("An error occurred during sequential operations:", error);
        }
    });
}
runSequentialAsyncOperations();
