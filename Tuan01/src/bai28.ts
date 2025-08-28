export class Animall {
    protected makeSound(): string {
        return "Animal sound";
    }
}

export class Dogg extends Animall {
    protected makeSound(): string {
        return "Gau!";
    }
}

export class Catt extends Animall {
    protected makeSound(): string {
        return "Meow";
    }
}