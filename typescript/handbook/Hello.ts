/*
Arrays
To specify the type of an array like [1, 2, 3] , you can use the syntax 
number[] ; this syntax works for any type (e.g. string[] is an array 
of strings, and so on). You may also see this written as Array<number>

any
TypeScript also has a special type, any , that you can use whenever 
you don't want a particular value to cause typechecking errors.

Type Annotations on Variables
When you declare a variable using const , var , or let , you can 
optionally add a type annotation to explicitly specify the type of 
the variable:

let myName: string = "Alice";

Functions
Functions are the primary means of passing data around in JavaScript. 
TypeScript allows you to specify the types of both the input and output 
values of functions.

Parameter Type Annotations
When you declare a function, you can add type annotations after each p
arameter to declare what types of parameters the function accepts. 
Parameter type annotations go after the parameter name:

// Parameter type annotation
function greet(name: string) {
          console.log("Hello, " + name.toUpperCase() + "!!");
}

Return Type Annotations
You can also add return type annotations. Return type annotations appear 
after the parameter list:

function getFavoriteNumber(): number {
          return 26;
}

Much like variable type annotations, you usually don't need a 
return type annotation because TypeScript will infer the function's 
return type based on its return statements.

Anonymous Functions
When a function appears in a place where TypeScript can 
determine how it's going to be called, the parameters of 
that function are automatically given types.

Here's an example:
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
          // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
          console.log(s.toUppercase());
})

// Contextual typing also applies to arrow functions
names.forEach((s) => {
          // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
          console.log(s.toUppercase());
})


-: Object Types
To define an object type, we simply list its properties 
and their types. For example, here's a function that 
takes a point-like object:

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
          console.log("The coordinate's x value is " + pt.x);

          console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });

Optional Properties
Object types can also specify that some or all of their 
properties are optional. To do this, add a ? after the 
property name:

function printName(obj: { first: string; last?: string }) {
          // ...
}

// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

In JavaScript, if you access a property that doesn't exist, you'll 
get the value undefined rather than a runtime error. Because 
of this, when you read from an optional property, you'll have 
to check for undefined before using it.

function printName(obj: { first: string; last?: string }) {
          // Error - might crash if 'obj.last' wasn't provided!
          console.log(obj.last.toUpperCase());
          
          // Object is possibly 'undefined'
          if (obj.last !== undefined) {
                    // OK
                    console.log(obj.last.toUpperCase());
          }

          // A safe alternative using modern JS syntax
          console.log(obj.last?.toUpperCase())
}

Union Types
TypeScript's type system allows you to build new types out of 
existing ones using a large variety of operators. Now that we 
know how to write a few types, it's time to start combining 
them in interesting ways.

Defining a Union Type
The first way to combine types you might see is a union type. 
A union type is a type formed from two or more other types, 
representing values that may be any one of those types.

Let's write a function that can operate on strings or numbers:

function printId(id: number | string) {
          console.log('Your ID is: ' + id)
}

// OK
printId(101);
// OK
printId("202");
// Error: Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
// printId({ myID: 22342 });

Working with Union Types
TypeScript will only allow an operation if it is valid for 
every member of the union. For example, if you have the 
union string | number , you can't use methods that are only 
available on string :

function printId(id: number | string) {
          Property 'toUpperCase' does not exist on type 'string | number'.
          Property 'toUpperCase' does not exist on type 'number'.
          console.log(id.toUpperCase());
}

The solution is to narrow the union with code, the same as you 
would in JavaScript without type annotations. Narrowing 
occurs when TypeScript can deduce a more specific type for 
a value based on the structure of the code.

For example, TypeScript knows that only a string value will 
have a typeof value "string" :

function printId(id: number | string) {
          if(typeof id === 'string') {
                    in ds branch, id is of type 'string'
                    console.log(id.toUpperCase());
          } else {
                    Headers, id is of type 'number'
                    console.log(id)
          }
}

Another example is to use a function like Array.isArray :
let x = ['Taye', 'Kehinde']

function welcomePeople(x: string[] | string) {
          if(Array.isArray(x)) {
                    console.log('Hello, ' + x.join(' and ') )
          }else {
                    console.log('Welcome lone traveler ' + x)
          }
}

welcomePeople(x)

Sometimes you'll have a union where all the members have 
something in common. For example, both arrays and strings 
have a slice method. If every member in a union has a property 
in common, you can use that property without narrowing:

Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
          return x.slice(0, 3);
}


-: Type Aliases
The syntax for a type alias is:
type Point = {
          x: number;
          y: number;
}

Or:

type Point = {
          x: number,
          y: number,
}

function printCoord(pt : Point) {
          console.log("The coordinate's x value is " + pt.x)

          console.log("The coordinate's y value is " + pt.y)
}

printCoord({x: 100, y: 100})

You can actually use a type alias to give a name to any 
type at all, not just an object type. For example, a type 
alias can name a union type:

type ID = number | string

This code might look illegal, but is OK according to 
TypeScript because both types are aliases for the 
same type:

type UserInputSanitizedString = string;

function sanitizeInput(str: string) : UserInputSanitizedString {
          return sanitize(str);
}

// create a sanitized input
let userInput = sanitizeInput(getInput())

// can still be re-assigned with a string though
userInput = 'new input'


-: Interfaces
An interface declaration is another way to name an object type:
interface Point {
          x: number;
          y: number;
}

Or:

interface Point {
          x: number,
          y: number,
}

function printCoord(pt : Point) {
          console.log("The coordinate's x value is " + pt.x)

          console.log("The coordinate's y value is " + pt.y)
}

printCoord({x: 100, y: 100})


-: Differences Between Type Aliases and Interfaces
Almost all features of an interface are available in type , 
the key distinction is that a type cannot be re-opened to 
add new properties vs an interface which is always extendable.

Interface 
A. Extending an interface 

interface Animal {
          name: string
}

interface Bear extends Animal {
          honey: boolean
}

const bear = getBear()
bear.name
bear.honey

B. Adding new fields to an existing interface
interface Window {
          title: string 
}

interface Window {
          ts: TypeScriptAPI
}

const src ='const a = "hello world" ';
window.ts.transpileModule(src, {});



Type
A. Extending a type via intersections

type Animal = {
          name: string
}

typee Bear =  Animal & {
          honey: boolean
}

const bear = getBear();
bear.name;
bear.honey;

B. A type cannot be changed after being created
type Window = {
          title: string
}

type Window = {
          ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'.

stop at pg 30: Type Assertions
*/
