class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class Dog extends Animal {
    /**
     * bark
     */
    public bark() {
        return 'bark';
    }
}

export class Cat extends Animal {
    /**
     * meow
     */
    public meow() {
        return 'meow';
    }
}