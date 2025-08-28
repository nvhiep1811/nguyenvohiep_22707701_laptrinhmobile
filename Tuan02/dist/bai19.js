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
exports.fetchUsers = fetchUsers;
const bai18_1 = require("./bai18");
function fetchUsers(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield Promise.all(ids.map(id => (0, bai18_1.fetchUser)(id)));
        return users;
    });
}
function run19() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers([1, 2, 3]);
        console.log(users);
    });
}
run19();
