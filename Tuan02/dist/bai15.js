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
exports.fn1 = fn1;
exports.fn2 = fn2;
exports.fn3 = fn3;
function fn1() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("Result from fn1");
            }, 1500);
        });
    });
}
function fn2() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("Result from fn2");
            }, 500);
        });
    });
}
function fn3() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("Result from fn3");
            }, 1000);
        });
    });
}
function run15() {
    return __awaiter(this, void 0, void 0, function* () {
        const result1 = yield fn1();
        console.log(result1);
        const result2 = yield fn2();
        console.log(result2);
        const result3 = yield fn3();
        console.log(result3);
    });
}
run15();
