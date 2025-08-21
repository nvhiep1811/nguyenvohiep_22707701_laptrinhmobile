class Employee {

}

export class Manager extends Employee {
    /**
     * do
     */
    public do(): string {
        return 'Manager is working.'
    }
}

export class Developer extends Employee {
    /**
     * do
     */
    public do(): string {
        return 'Developer is coding.'
    }
}