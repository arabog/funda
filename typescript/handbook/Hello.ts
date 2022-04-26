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






stop at pg 28
*/