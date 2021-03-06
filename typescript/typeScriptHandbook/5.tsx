/*
Types Operator
-: Keyof Type Operator
The keyof operator takes an object type and produces a string 
or numeric literal union of its keys.
The following type P is the same type as "x" | "y":

type Point = {x: number, y: number};
type P = keyof Point;

If the type has a string or number index signature, keyof 
will return those types instead:

type Arrayish = {[n: number]: unknown }
type A = keyof Arrayish

-: The typeof type operator
JavaScript already has a typeof operator you can use in 
an expression context:

// Prints "string"
console.log(typeof "Hello world");

TypeScript adds a typeof operator you can use in a type 
context to refer to the type of a variable or property:

let s = "hello";
let n: typeof s;

This isn't very useful for basic types, but combined with 
other type operators, you can use typeof to conveniently 
express many patterns. For an example, let's start by 
looking at the predefined type ReturnType<T> . It takes 
a function type and produces its return type:

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>

If we try to use ReturnType on a function name, we see an 
instructive error:

function f() {
          return { x: 10, y: 3 };
}

type P = ReturnType<f>;

Remember that values and types aren't the same thing. To refer 
to the type that the value f has, we use typeof :

function f() {
          return {x: 10, y: 3}
}

type P = ReturnType<typeof f>

-: Limitations
Specifically, it's only legal to use typeof on identifiers (i.e.
variable names) or their properties. This helps avoid the 
confusing trap of writing code you think is executing, but isn't:

// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
// ',' expected

-: Indexed Access Types
We can use an indexed access type to look up a specific 
property on another type:

ype Person = {age: number; name: string; alive: boolean};
type Age = Person['age']

The indexing type is itself a type, so we can use unions, keyof , or 
other types entirely:

type Person = {age: number; name: string; alive: boolean};
type Age = Person['age']

type T1 = Person['age' | 'name'];

type T2 = Person[keyof Person]


type AliveOrName = 'alive' | 'name'
type T3 = Person[AliveOrName]

You'll even see an error if you try to index a property that 
doesn't exist:
type I1 = Person["alve"];

Another example of indexing with an arbitrary type is using 
number to get the type of an array's elements. We can combine 
this with typeof to conveniently capture the element type of an array
literal

const MyArray = [
          { name: "Alice", age: 15 },
          { name: "Bob", age: 23 },
          { name: "Eve", age: 38 },
]

type Person = typeof MyArray[number]

type Age = typeof Myrray[number]['age']
Or:
type Age2 = Person['age']

You can only use types when indexing, meaning you can't 
use a const to make a variable reference:

const key = "age";
type Age = Person[key];

However, you can use a type alias for a similar style of refactor:

type key = "age";
type Age = Person[key];


cont on pg 139

ReactTS pg 241

NextJS pg 310

*/ 