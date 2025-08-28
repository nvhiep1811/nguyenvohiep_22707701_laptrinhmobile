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
exports.bai13 = bai13;
function bai13() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');//success
            const response = yield fetch('https://api.example.com/data'); //error
            if (!response.ok) {
                console.log("-----Bài 13-----");
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("-----Bài 13-----");
            console.log(data);
        }
        catch (error) {
            console.log("-----Bài 13-----");
            console.error(error);
        }
    });
}
