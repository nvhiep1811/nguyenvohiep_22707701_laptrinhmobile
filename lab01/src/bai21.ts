export class Repository<T> {
    value: T[];

    constructor(value: T[]) {
        this.value = value;
    }

    getAll(): T[] {
        return this.value;
    }

    add(value: T): void {
        this.value.push(value);
    }
}