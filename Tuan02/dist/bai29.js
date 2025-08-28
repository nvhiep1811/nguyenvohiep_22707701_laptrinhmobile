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
exports.queueProcess = queueProcess;
const bai28_1 = require("./bai28");
function queueProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = [1, 2, 3, 4, 5].map((id) => (0, bai28_1.asyncTask)(id));
        for (const task of tasks) {
            const result = yield task;
            console.log(result);
        }
    });
}
