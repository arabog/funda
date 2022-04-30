/*
-: More on Functions
They're also values, and just like other values, TypeScript 
has many ways to describe how functions can be called. 
Let's learn about how to write types that describe functions.

Function Type Expressions
The simplest way to describe a function is with a function 
type expression. These types are syntactically similar to 
arrow functions:

function greeter(fn: (a: string) => void) {
          fn('Hello, World')
}

function printToConsole(s: string) {
          console.log(s)
}

greeter(printToConsole);

The syntax (a: string) => void means "a function with one 
parameter, named a , of type string, that doesn't have a 
return value".

Note that the parameter name is required. The function 
type (string) => void means "a function with a parameter 
named string of type any "!

Of course, we can use a type alias to name a function type:

type GreetFunction = (a: string) => void;

function greeter(fn: GreetFunction) {}


-: Call Signatures
In JavaScript, functions can have properties in addition to being 
callable. However, the function type expression syntax doesn't 
allow for declaring properties. If we want to describe something 
callable with properties, we can write a call signature in an object 
type:

type DescribableFunction = {
          description: string;
          (someArg: number): boolean;
}

function doSomething(fn: DescribableFunction) {
          console.log(fn.description + " returned " + fn(6))
}

Note that the syntax is slightly different compared to a function 
type expression - use : between the parameter list and the return 
type rather than => .

-: Construct Signatures
JavaScript functions can also be invoked with the new operator. 
TypeScript refers to these as constructors because they usually 
create a new object. You can write a construct signature by
adding the new keyword in front of a call signature:

type SomeConstructor = {
          new (s: string): SomeObject
}

function fn(ctor: SomeConstructor) {
          return new ctor('Hello')
}

Some objects, like JavaScript's Date object, can be called with 
or without new . You can combine call and construct signatures 
in the same type arbitrarily:

interface CallOrConstruct  {
          new (s: string): Date;

          (n?: number): number:
}


-: Generic Functions
It's common to write a function where the types of the input 
relate to the type of the output, or where the types of two 
inputs are related in some way. Let's consider for a moment 
a function that returns the first element of an array:

function firstElement(arr: any[]) {
          return arr[0];
}

This function does its job, but unfortunately has the return 
type any. It'd be better if the function returned the type of 
the array element.

In TypeScript, generics are used when we want to describe 
a correspondence between two values.

We do this by declaring a type parameter in the function 
signature:

function firstElement<Type>(arr: Type[]): Type | undefined {
          return arr[0];
}

// s is of type 'string'
const s = firstElement(['a', 'b', 'c']);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);


-: Inference
Note that we didn't have to specify Type in this sample. The 
type was inferred - chosen automatically - by TypeScript.

We can use multiple type parameters as well. For example, 
a standalone version of map would look like this:

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
          return arr.map(func)
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(['1', '2', '3'], (n) => parseInt(n))

Note that in this example, TypeScript could infer both the 
type of the Input type parameter (from the given string array), 
as well as the Output type parameter based on the return value 
of the function expression ( number ).


-: Constraints
We've written some generic functions that can work on any kind 
of value. Sometimes we want to relate two values, but can only 
operate on a certain subset of values. In this case, we can use a
constraint to limit the kinds of types that a type parameter can 
accept.

Let's write a function that returns the longer of two values. To do 
this, we need a length property that's a number. We constrain the 
type parameter to that type by writing an extends clause:

function longest<Type extends {length: number} > (a: Type, b: Type) {
          if(a.length >= b.length) {
                    return a;
          }else {
                    return b;
          }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);

// longerString is of type 'alice' | 'bob'
const longerString = longest('alice', 'bob');

// Error! Numbers don't have a 'length' property
const notOk = longest(10, 100)

Argument of type 'number' is not assignable to parameter of 
type '{ length: number; }'


Because we constrained Type to { length: number } , we were 
allowed to access the .length property of the a and b parameters. 
Without the type constraint, we wouldn't be able to access
those properties because the values might have been some other 
type without a length property.

The types of longerArray and longerString were inferred 
based on the arguments. Remember, generics are all about 
relating two or more values with the same type!


function minimumLength<Type extends {length: number}>(obj: Type, minimum: length): Type {
          if (obj.length >= minimum) {
                    return obj;
          }else {
                    return {length: minimum}

                    Type '{ length: length; }' is not assignable to type 'Type'.
                    '{ length: length; }' is assignable to the constraint of type 
                    'Type', but 'Type' could be instantiated with a different subtype 
                    of constraint '{ length: number; }'.

          }
} 

It might look like this function is OK - Type is constrained to 
{ length: number } , and the function either returns Type or a 
value matching that constraint. The problem is that the function
promises to return the same kind of object as was passed in, not 
just some object matching the constraint. If this code were legal, 
you could write code that definitely wouldn't work:

// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);

// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));


-: Specifying Type Arguments
TypeScript can usually infer the intended type arguments in a 
generic call, but not always. For example, let's say you wrote 
a function to combine two arrays:

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
          return arr1.concat(arr2)
}

Normally it would be an error to call this function with 
mismatched arrays:

const arr = combine([1, 2, 3], ["hello"]);
Type 'number' is not assignable to type 'string'.

If you intended to do this, however, you could manually specify Type :

const arr = combine<string | number>([1, 2, 3], ["hello"])


-: Guidelines for Writing Good Generic Functions

Push Type Parameters Down
Here are two ways of writing a function that appear similar:

function firstElement1<Type>(arr: Type[]) {
          return arr[0]
}

function firstElement2 <Type extends any[]> (arr: Type) {
          return arr[0]
}

// a: number (good)
const a = firstElement1([1, 2, 3]);

// b: any (bad)
const b = firstElement2([1, 2, 3]);

These might seem identical at first glance, but firstElement1 
is a much better way to write this function. Its inferred return 
type is Type , but firstElement2 's inferred return type is any
because TypeScript has to resolve the arr[0] expression using 
the constraint type, rather than "waiting" to resolve the element 
during a call.

Rule: 
When possible, use the type parameter itself rather than 
constraining it i.e firstElement1 format

Use Fewer Type Parameters
Here's another pair of similar functions:

function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[]
          return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
          return arr.filter(func);
}

We've created a type parameter Func that doesn't relate 
two values. That's always a red flag, because it means 
callers wanting to specify type arguments have to 
manually specify an extra type argument for no reason. 
Func doesn't do anything but make the function harder 
to read and reason about!

Type Parameters Should Appear Twice
Sometimes we forget that a function might not need to be generic:

function greet<Str extends string>(s: string) {
          console.log("hello " + s)
}

greet("World")

We could just as easily have written a simpler version:
function greet(s: string) {
          console.log("hello " + s)
}

greet("World")

Remember, type parameters are for relating the types of multiple 
values. If a type parameter is only used once in the function 
signature, it's not relating anything.


-: Optional Parameters
Functions in JavaScript often take a variable number of arguments. 
For example, the toFixed method of number takes an optional digit 
count:

function f(n: number) {
          console.log(n.toFixed()); // 0 arguments

          console.log(n.toFixed(3)); // 1 arguments
}

We can model this in TypeScript by marking the parameter 
as optional with ? :

function f(x?: number) {}

f(); // OK
f(10); // OK


Although the parameter is specified as type number , the 
x parameter will actually have the type number | undefined 
because unspecified parameters in JavaScript get the value 
undefined . 

You can also provide a parameter default:
function f(x = 10) {}

Now in the body of f , x will have type number because any 
undefined argument will be replaced with 10 . Note that when 
a parameter is optional, callers can always pass undefined , as
this simply simulates a "missing" argument:

declare function f(x? number): void;

// All OK
f();
f(10);
f(undefined);

-: Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void ) {
	for (let i = 0; i < arr.length; i++) {
		callback(arr[i], i)
		
	}
}

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(i.toFixed()));

function myForEach(arr: any[], callback: (arg: any, index: number) => void ) {
	for (let i = 0; i < arr.length; i++) {
		callback(arr[i], i)
		
	}
}

When writing a function type for a callback, never write 
an optional parameter unless you intend to call the
function without passing that argument


-: Function Overloads
In TypeScript, we can specify a function that can be called 
in different ways by writing overload signatures.

function fn(x: boolean): void;

// Argument type isn't right
function fn(x: string): void; 
//This overload signature is not compatible with its 
// implementation signature.(2394)

function fn(x: boolean) {}

function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;

function fn(x: string | number) {
	return "oops";
}


function fn(x: string): number;
// Return type isn't right
function fn(arr: any[]): number;

function fn(x: any) {
	return x.length;
}

fn(""); // OK
fn([0]); // OK

Error
fn(Math.random() > 0.5 ? 'Hello' : [0]);

Always prefer parameters with union types instead 
of overloads when possible

function len(x: any[] | string) {
          return x.length;
}


-: Declaring this in a Function
const user = {
          id: 123,
          admin: false,

          becomeAdmin: function () {
                    this.admin = true;
          },
};

TypeScript understands that the function 
user.becomeAdmin has a corresponding this which is
the outer object user

interface DB {
          filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();

const admins = db.filterUsers(function (this: User) {
          return this.admin;
});

Note that you need to use function and not arrow functions 
to get this behavior:
interface DB {
          filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();

const admins = db.filterUsers(() => this.admin);


-: Other Types to Know About
void
It's the inferred type any time a function doesn't have 
any return statements, or doesn't return any explicit 
value from those return statements:

// The inferred return type is void
function noop() {
          return;
}

object
Function types are considered to be object s in TypeScript.

unknown
The unknown type represents any value. This is similar to 
the any type, but is safer because it's not legal to do 
anything with an unknown value:

function f1(a: any) {
	a.b() //OK
}

function f2(a: unknown) {
	a.b() //Object is of type 'unknown'.
}

function safeParse(s: string): unknown {
          return JSON.parse(s);
}
// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);

never
Some functions never return a value:
function fail(msg: string): never {
          throw new Error(msg);
}

never also appears when TypeScript determines 
there's nothing left in a union.

function fn(x: string | number) {
          if (typeof x === "string") {
                    // do something
          } else if (typeof x === "number") {
                    // do something else
          } else {
                    x; // has type 'never'!
          }
}

-: Rest Parameters and Arguments
A rest parameter appears after all other parameters, 
and uses the ... syntax:

function multiply(n: number, ...m: number[]) {
          return m.map((x) => n * x);
}

// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);






cont on pg 76
*/ 