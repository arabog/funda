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




*/ 
