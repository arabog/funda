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


Sometimes you will have information about the type of a value 
that TypeScript can't know about.
For example, if you're using document.getElementById , TypeScript 
only knows that this will return some kind of HTMLElement , but 
you might know that your page will always have an
HTMLCanvasElement with a given ID.

In this situation, you can use a type assertion to specify a more 
specific type:

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement

You can also use the angle-bracket syntax (except if the code is in a .tsx file), 
which is equivalent:

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas")

Reminder: Because type assertions are removed at compile-time, there is 
no runtime checking associated with a type assertion. There won't be an 
exception or null generated if the type assertion is wrong.

function printAll(strs: string | string[] | null) {
          if (typeof strs === "object") {
                    for (const s of strs) {
                              <!-- Error: Object is possibly 'null'. -->
                              console.log(s);
                    }
          } else if (typeof strs === "string") {
                    console.log(strs);
          } else {
                    // do nothing
          }
}

In the printAll function, we try to check if strs is an object to 
see if it's an array type (now might be a good time to reinforce 
that arrays are object types in JavaScript). But it turns out that in
JavaScript, typeof null is actually "object" ! This is one of those 
unfortunate accidents of history.


-: Truthiness narrowing
In JavaScript, constructs like if first "coerce" their conditions 
to boolean s to make sense of them, and then choose their 
branches depending on whether the result is true or false . 
Values like
0
NaN
"" (the empty string)
0n (the bigint version of zero)
null
undefined

all coerce to false , and other values get coerced true . You can 
always coerce values to boolean s by running them through the 
Boolean function, or by using the shorter double-Boolean negation.

// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true

!!"world"; // type: true, value: true

It's fairly popular to leverage this behavior, especially for guarding 
against values like null or undefined . As an example, let's try using 
it for our printAll function.

function printAll(strs: string | string[] | null) {
          if (strs && typeof strs === "object") {
                    for (const s of strs) {
                              console.log(s);
                    }
          } else if (typeof strs === "string") {
                    console.log(strs);
          }
}

You'll notice that we've gotten rid of the error above by checking 
if strs is truthy. This at least prevents us from dreaded errors when 
we run our code like:
TypeError: null is not iterable

Keep in mind though that truthiness checking on primitives can often 
be error prone.


-: Equality narrowing
TypeScript also uses switch statements and equality checks like === , 
!== , == , and != to narrow types. For example:

function example(x: string | number, y: string | boolean) {
          if(x === y) {
                    we can now call any 'string' method on 'x' or 'y'
                    x.toUpperCase();    //string
                    y.toLowerCase();    //string
          }else {
                    console.log(x);     //x: string | number
                    console.log(y);     //y: //string | boolean
          }
}

When we checked that x and y are both equal in the above 
example, TypeScript knew their types also had to be equal. 
Since string is the only common type that both x and y could 
take on, TypeScript knows that x and y must be a string in 
the first branch.

Checking against specific literal values (as opposed to variables) 
works also. In our section about truthiness narrowing, we wrote 
a printAll function which was error-prone because it accidentally 
didn't handle empty strings properly. Instead we could have done 
a specific check to block out null s, and TypeScript still correctly 
removes null from the type of strs .

function printAll(strs: string | string[] | null) {
          if(str !== null) {
                    if(typeof strs === 'object') {
                              for(const s of strs) {        //strs: string[]
                                        console.log(s)
                              }
                    }else if (typeof strs === 'string') {
                              console.log(str)    //strs: string
                    }
          }
}

JavaScript's looser equality checks with == and != also 
get narrowed correctly. If you're unfamiliar, checking 
whether something == null actually not only checks 
whether it is specifically the value null - it also checks 
whether it's potentially undefined . The same applies to ==
undefined : it checks whether a value is either null or undefined .

interface Container {
          value: number | null | undefined
}

function multipleValue(container: Container, factor: number) {
          // remove both 'null' and 'undefined' from d type
          if(container.value != null) {
                    console.log(container.value) // value= Container.value: number

                    // now we can safely multiply 'container.value'
                    container.value * factor;
          }
}


-: The in operator narrowing
JavaScript has an operator for determining if an object 
has a property with a name: the in operator.

For example, with the code: "value" in x . where "value" 
is a string literal and x is a union type. The "true" branch 
narrows x 's types which have either an optional or required 
property value , and the "false" branch narrows to types 
which have an optional or missing property value .

type Fish = {swim: () => void}
type Bird = {fly: () => void}

function move(animal: Fish | Bird) {
          if("swim" in animal) {
                    return animal.swim();
          }

          return animal.fly();
}

To reiterate, optional properties will exist in both sides 
for narrowing, for example a human could both swim 
and fly (with the right equipment) and thus should show 
up in both sides of the in check:

type Fish = {swim: () => void}
type Bird = {fly: () => void}
type Human = {swim?: () => void; fly?: () => void}

function move(animal: Fish | Bird | Human) {
          if("swim" in animal) {
                    return animal;
          }

          return animal;
}


-: instanceof narrowing
They can be useful for most values that can be constructed 
with new . As you might have guessed, instanceof is also a 
type guard, and TypeScript narrows in branches guarded by
instanceof s.

function move(x: Date | string) {
          if(x instanceof Date) {
                    console.log(x.toUTCString())  //x: Date
          }else {
                    console.log(x.toUpperCase())  //x: string
          }
}


-: Assignments
When we assign to any variable, TypeScript looks at the right 
side of the assignment and narrows the left side appropriately.

let x = Math.random() < 0.5 ? 10 : 'Hello world!'           //x: string | number

x = 1;
console.log(x)      //x: number

x = 'goodbye'
console.log(x)      //x: string

Notice that each of these assignments is valid. Even though 
the observed type of x changed to number after our first 
assignment, we were still able to assign a string to x . This 
is because the declared type of x - the type that x started 
with - is string | number , and assignability is always checked 
against the declared type.

If we'd assigned a boolean to x , we'd have seen an error since 
that wasn't part of the declared type.

x = true  //Type 'boolean' is not assignable to type 'string | number'.








cont on page 53

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
*/
