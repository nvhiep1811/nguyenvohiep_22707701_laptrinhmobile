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
const bai15_1 = require("./bai15");
function run16() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield Promise.all([(0, bai15_1.fn1)(), (0, bai15_1.fn2)(), (0, bai15_1.fn3)()]);
        console.log("-----Bài 16-----");
        results.forEach(result => console.log(result));
    });
}
