import type { InterviewQuestion } from '../../types'

export const prototypeQuestions: InterviewQuestion[] = [
  {
    id: 50,
    category: 'Prototypes & OOP',
    question: 'What is prototypal inheritance?',
    answer: 'Prototypal inheritance means objects delegate property lookups to another object through the prototype chain rather than copying all behavior upfront. When rabbit.eats is accessed, JavaScript does not find eats on rabbit itself, so it walks up to animal and finds it there. The chain ends at null, which is why understanding this lookup is key to how arrays, functions, and plain objects share methods.',
    code: `const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.jumps = true;
console.log(rabbit.eats);  // true — from prototype
console.log(rabbit.jumps); // true — own property`,
    demo: 'prototype-chain',
  },
  {
    id: 51,
    category: 'Prototypes & OOP',
    question: 'What is the difference between __proto__ and prototype?',
    answer: '__proto__ (or better, Object.getPrototypeOf) is the actual link on an instance pointing to its parent object in the chain. prototype is a property that exists only on constructor functions and becomes the __proto__ of objects created with new. When you call new Person("Bob"), the instance\'s prototype chain is wired to Person.prototype where greet is defined.',
    code: `function Person(name) { this.name = name; }
Person.prototype.greet = function() {
  return \`Hi, \${this.name}\`;
};
const p = new Person("Bob");
console.log(p.greet());
console.log(p.__proto__ === Person.prototype); // true`,
    output: ['Hi, Bob', 'true'],
  },
  {
    id: 52,
    category: 'Prototypes & OOP',
    question: 'What does the new keyword do?',
    answer: 'The new keyword orchestrates five steps: create a new empty object, set its prototype to the constructor\'s prototype property, bind this to that object, run the constructor body, and return the object unless the constructor explicitly returns a different object. That is how Car instances get both their own model property and shared methods like drive from Car.prototype. Understanding these steps explains why forgetting new leaves this unbound and can mutate global state.',
    code: `function Car(model) {
  this.model = model;
}
Car.prototype.drive = () => "vroom";
const car = new Car("Tesla");
console.log(car.model);
console.log(car.drive());`,
    output: ['Tesla', 'vroom'],
  },
  {
    id: 53,
    category: 'Prototypes & OOP',
    question: 'What are ES6 classes and how do they relate to prototypes?',
    answer: 'ES6 classes are syntactic sugar over the same constructor-plus-prototype model—extends and super compile down to prototype chaining under the hood. They add clearer syntax for inheritance, static methods, and true private fields with # that plain prototype code could not enforce as strictly. You still get one shared prototype for methods rather than copying them per instance. }; Foo.prototype.render = ... did before hooks became common.',
    code: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; }
}
console.log(new Dog("Rex").speak());`,
    output: ['Rex barks'],
  },
  {
    id: 54,
    category: 'Prototypes & OOP',
    question: 'What is the difference between Object.create and new?',
    answer: 'Object.create(proto) makes a new object whose prototype is set directly to the object you pass in, without running any constructor function. new Constructor() also sets up the prototype link but additionally executes the constructor to initialize instance state on this. Use Object.create when you only need delegation without constructor side effects.',
    code: `const proto = { greet() { return "hello"; } };
const a = Object.create(proto);
const b = new (function() {})();
console.log(a.greet()); // "hello"
console.log(Object.getPrototypeOf(a) === proto);`,
    output: ['hello', 'true'],
  },
  {
    id: 55,
    category: 'Prototypes & OOP',
    question: 'What is hasOwnProperty vs in operator?',
    answer: 'hasOwnProperty returns true only for properties stored directly on the object, not those inherited from the prototype chain. The in operator checks the entire chain, so inherited is true for "inherited" even though the object does not own that key. This distinction matters when you iterate keys or merge objects and want to skip inherited defaults.',
    code: `const obj = Object.create({ inherited: true });
obj.own = true;
console.log(obj.hasOwnProperty("own"));       // true
console.log(obj.hasOwnProperty("inherited")); // false
console.log("inherited" in obj);              // true`,
    output: ['true', 'false', 'true'],
  },
  {
    id: 56,
    category: 'Prototypes & OOP',
    question: 'What is method borrowing?',
    answer: 'Method borrowing means calling a function that lives on one object\'s prototype as if it belonged to another object, usually via call, apply, or bind. Array-like objects such as arguments or NodeList have length and indexed items but not array methods, so Array.prototype.slice.call(nums) turns them into a real array. It works because most JavaScript methods only care about this, not which object originally owned the function.',
    code: `const nums = { 0: "a", 1: "b", length: 2 };
const arr = Array.prototype.slice.call(nums);
console.log(arr);
console.log(Array.isArray(arr));`,
    output: ['["a", "b"]', 'true'],
  },
  {
    id: 57,
    category: 'Prototypes & OOP',
    question: 'What are private class fields (#)?',
    answer: 'Private class fields prefixed with # are enforced by the language: only code inside the class body can read or write them. Unlike naming conventions like _secret, #key is a true private slot—you get a SyntaxError if you try to access s.#key from outside the class, even from a subclass. This gives you encapsulation similar to Java or TypeScript private without a build step.',
    code: `class Secret {
  #key = "hidden";
  reveal() { return this.#key; }
}
const s = new Secret();
console.log(s.reveal());
// console.log(s.#key); // SyntaxError`,
    output: ['hidden'],
  },
  {
    id: 58,
    category: 'Prototypes & OOP',
    question: 'What is the difference between composition and inheritance?',
    answer: 'Inheritance models an "is-a" relationship—a Dog is an Animal and inherits its entire interface and state shape. Composition models "has-a" behavior by combining smaller objects or functions, like giving duck both canFly and canSwim without a deep class tree. Favoring composition avoids fragile base classes and diamond-shaped hierarchy problems.',
    code: `// Composition
const canFly = { fly() { return "flying"; } };
const canSwim = { swim() { return "swimming"; } };
const duck = Object.assign({}, canFly, canSwim);
console.log(duck.fly(), duck.swim());`,
    output: ['flying', 'swimming'],
  },
  {
    id: 59,
    category: 'Prototypes & OOP',
    question: 'What is Object.getPrototypeOf and Object.setPrototypeOf?',
    answer: 'Object.getPrototypeOf returns the object that another object delegates to—the standard, safe replacement for reading __proto__ directly. Object.setPrototypeOf mutates that link after creation, which forces the engine to adjust internal shapes and can hurt performance on hot paths. Prefer setting the prototype at creation time with Object.create or class extends.',
    code: `const parent = { type: "parent" };
const child = { name: "child" };
Object.setPrototypeOf(child, parent);
console.log(child.type);
console.log(Object.getPrototypeOf(child) === parent);`,
    output: ['parent', 'true'],
  },
]
