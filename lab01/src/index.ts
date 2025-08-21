import { Person } from "./bai1";
import { Account } from "./bai10";
import { Cat, Dog } from "./bai11";
import { Bird, Fish } from "./bai12";
import { Circle, Square } from "./bai13";
import { Developer, Manager } from "./bai14";
import { Library } from "./bai15";
import { Box } from "./bai16";
import { Logger } from "./bai17";
import { Student } from "./bai2";
import { Car } from "./bai3";
import { Rectangle } from "./bai4";
import { BankAccount } from "./bai5";
import { Book } from "./bai6";
import { User } from "./bai7";
import { Product } from "./bai8";

var person = new Person("Hiep", 20);
var student = new Student("Hiep", 20, 4.0);
var myCar = new Car("BMW", "SUV", 2025);
var rec = new Rectangle(10, 20);
var myBC = new BankAccount(100);
var myBook = new Book("One Thousand and One Nights", "Antoine Galland", 2019);
var user = new User("Hiep N. V.");
var products = [new Product('Computer', 100), new Product('Bridge', 120), new Product('Car', 200)];
var acc = new Account("123", 100);
var dog = new Dog('Meow');
var cat = new Cat('Gau');
var bird = new Bird();
var fish = new Fish();
var square = new Square(10);
var circle = new Circle(5);
var manager = new Manager();
var dev = new Developer();
var lib = new Library();
var stringBox = new Box<string>("Hello,Hiep!");
var logger = Logger.getInstance();

console.log(person);
console.log(student);
console.log(myCar);
console.log(rec);
console.log(' with area: ' + rec.calc_area() + ' and perimeter: ' + rec.calc_perimeter());
console.log(myBC);
myBC.deposit(100)
console.log('After deposit 100: ' + myBC.balance);
myBC.withdraw(100)
console.log('After withdraw 100: ' + myBC.balance);
console.log(myBook);
console.log(user);
user.newName = 'Hiep'
console.log('After set new username: ' + user.username);
console.log('List product: ');
console.log(products);

console.log('After filter products with price > 100: ');
console.log(products.filter(p => p.price > 100));
console.log(acc);

console.log(dog.bark());
console.log(cat.meow());
console.log(bird.fly());
console.log(fish.swim());
console.log('Area of square: ' + square.area());
console.log('Area of circle: ' + circle.area());
console.log('Manager: ' + manager.do());
console.log('Developer: ' + dev.do());
lib.addBook(myBook);
console.log('List book of library: ' )
console.log(lib.listBooks);
console.log(stringBox.boxValue);
logger.log('New message.')
console.log(logger.getLogs());
