import { Carrr, Robot } from './bai29';
import { Shapee } from './bai25';
import { Person } from "./bai1";
import { Account } from "./bai10";
import { Cat, Dog } from "./bai11";
import { Bird, Fish } from "./bai12";
import { Circle, Square } from "./bai13";
import { Developer, Manager } from "./bai14";
import { Library } from "./bai15";
import { Box } from "./bai16";
import { Logger } from "./bai17";
import { MathUtil } from "./bai18";
import { Animal, Elephant } from "./bai19";
import { Student } from "./bai2";
import { Bike, Carr, Vehicle } from "./bai20";
import { Repository } from "./bai21";
import { Stack } from "./bai22";
import { CardPayment, CashPayment } from "./bai23";
import { AirConditioner, Fan } from "./bai24";
import { Rectangle } from "./bai4";
import { BankAccount } from "./bai5";
import { Book } from "./bai6";
import { User } from "./bai7";
import { Product } from "./bai8";
import { Order } from './bai26';
import { Teacher } from './bai27';
import { Animall, Catt, Dogg } from './bai28';
import { Car } from './bai3';
import { School } from './bai30';

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
var animal = new Animal();
var elephant = new Elephant();
var vehicles = [new Carr(), new Bike()];
var repo = new Repository<Vehicle>(vehicles);
var stack = new Stack();
var cashPayment = new CashPayment();
var cardPayment = new CardPayment();
var appliances = [new Fan(), new AirConditioner()];
var shape = new Shapee();
var order = new Order(products);
var teacher = new Teacher("Hiep", 22, "Math");
var myCar2 = new Carrr();
var myRobot = new Robot();
var school = new School();

console.log('----------Bài 1----------');
console.log(person);
console.log('----------Bài 2----------');
console.log(student);
console.log('----------Bài 3----------');
console.log(myCar);
console.log('----------Bài 4----------');
console.log(rec);
console.log(' with area: ' + rec.calc_area() + ' and perimeter: ' + rec.calc_perimeter());
console.log('----------Bài 5----------');
console.log(myBC);
myBC.deposit(100)
console.log('After deposit 100: ' + myBC.balance);
myBC.withdraw(100)
console.log('After withdraw 100: ' + myBC.balance);
console.log('----------Bài 6----------');
console.log(myBook);
console.log('----------Bài 7----------');
console.log(user);
user.newName = 'Hiep'
console.log('After set new username: ' + user.username);
console.log('----------Bài 8----------');
console.log('List product: ');
console.log(products);

console.log('After filter products with price > 100: ');
console.log(products.filter(p => p.price > 100));

console.log('----------Bài 10----------');
console.log(acc);

console.log('----------Bài 11----------');
console.log(dog.bark());
console.log(cat.meow());

console.log('----------Bài 12----------');
console.log(bird.fly());
console.log(fish.swim());

console.log('----------Bài 13----------');
console.log('Area of square: ' + square.area());
console.log('Area of circle: ' + circle.area());

console.log('----------Bài 14----------');
console.log('Manager: ' + manager.do());
console.log('Developer: ' + dev.do());

console.log('----------Bài 15----------');
lib.addBook(myBook);
console.log('List book of library: ' )

console.log('----------Bài 16----------');
console.log(lib.listBooks);
console.log(stringBox.boxValue);

console.log('----------Bài 17----------');
logger.log('New message.')
console.log(logger.getLogs());

console.log('----------Bài 18----------');
console.log('Add: ' + MathUtil.add(5, 10));
console.log('Subtract: ' + MathUtil.subtract(10, 5));
console.log('Multiply: ' + MathUtil.multiply(5, 10));
console.log('Divide: ' + MathUtil.divide(10, 5));

console.log('----------Bài 19----------');
console.log('Animal: ');
animal.sound();
console.log('Elephant: ');
elephant.sound();

console.log('----------Bài 20----------');
console.log('Vehicles: ');
vehicles.forEach(v => {
    v.start();
    v.stop();
});

console.log('----------Bài 21----------');
console.log('Repository of vehicles:');

repo.add(new Carr());
repo.add(new Bike());
repo.getAll().forEach(v => {
    v.start();
    v.stop();
});

console.log('----------Bài 22----------');
console.log('Stack:');
stack.push(1);
stack.push(2);
stack.push(3);
console.log('Popped from stack: ' + stack.pop());
console.log('Peeked from stack: ' + stack.peek());
console.log('Is stack empty? ' + stack.isEmpty());

console.log('----------Bài 23----------');
console.log('Cash Payment:');
cashPayment.pay(100);

console.log('Card Payment:');
cardPayment.pay(200);

console.log('----------Bài 24----------');
console.log('Appliances:');
appliances.forEach(a => a.turnOn());

console.log('----------Bài 25----------');
console.log(Shapee.describe());

console.log('----------Bài 26----------');
console.log('Total price of list products: ' + order.calcTotalPrice());

console.log('----------Bài 27----------');
console.log(teacher.introduce());

console.log('----------Bài 29----------');
myCar2.move();
myRobot.move();

console.log('----------Bài 30----------');
console.log('School:');

school.addStudent(student);
school.addTeacher(teacher);
school.displayInfo();