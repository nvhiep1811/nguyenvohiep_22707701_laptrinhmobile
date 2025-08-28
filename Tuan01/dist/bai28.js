"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catt = exports.Dogg = exports.Animall = void 0;
class Animall {
    makeSound() {
        return "Animal sound";
    }
}
exports.Animall = Animall;
class Dogg extends Animall {
    makeSound() {
        return "Gau!";
    }
}
exports.Dogg = Dogg;
class Catt extends Animall {
    makeSound() {
        return "Meow";
    }
}
exports.Catt = Catt;
