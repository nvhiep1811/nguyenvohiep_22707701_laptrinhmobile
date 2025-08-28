"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    /**
     * deposit
amount: number     */
    deposit(amount) {
        this.balance += amount;
    }
    /**
     * withdraw
amount: number     */
    withdraw(amount) {
        this.balance -= amount;
    }
}
exports.BankAccount = BankAccount;
