export class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    /**
     * deposit
amount: number     */
    public deposit(amount: number) {
        this.balance += amount;
    }

    /**
     * withdraw
amount: number     */
    public withdraw(amount: number) {
        this.balance -= amount;
    }
}