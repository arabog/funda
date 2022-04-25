https://www.typescriptlang.org/play/

All the code snippets in this chapter can be found online at: 
https:/​ /github.​ com/​ carlrip/​ LearnReact17WithTypeScript/​ tree/​ master/​ 01-
TypeScriptBasics

Primitive types
Primitive types are simple values that have no properties. 

TypeScript shares the following primitive types with JS:
string : Represents a sequence of Unicode characters
number : Represents both integers and floating-point numbers
boolean : Represents a logical true or false
undefined : Represents a value that hasn't been initialized yet
null : Represents no value

-: Any
What if we declare a variable with no type annotation and no 
value? What does TypeScript infer as the type? Let's enter the 
following code in the TypeScript playground and find out:

let flag;

If we hover our mouse over flag , we see it has been given the 
any type:

So, the TypeScript compiler gives a variable with no type 
annotation and no immediately assigned value, the any type. 
The any type is specific to TypeScript; it doesn't exist in
JavaScript. It is a way of opting out of type checking on a 
particular variable. It is commonly used for dynamic content 
or values from third-party libraries. However, TypeScript's 
increasingly powerful type system means that we need to use 
any less often these days.

-: Void
It is generally used to represent a non-returning function.

function logText(text: string): void {
          console.log(text);
}

The function simply logs some text into the console and doesn't 
return anything. So, we've marked the return type as void .

-: Never
The never type represents something that would never occur 
and is typically used to specify unreachable areas of code.

function foreverTask(taskName: string) : never {
          while(true) {
                    console.log(`Doing ${taskName} over and over again ...`)
          }
} 

The function invokes an infinite loop and never returns, and 
so we have given it a type annotation of never . This is different 
to void because void means it will return, but with no value.

We will probably need to explicitly define the never type 
annotation because the TypeScript compiler isn't smart 
enough yet to infer that.

-: Enumerations
Enumerations allow us to declare a meaningful set of friendly 
names that a variable can be set to. We use the enum keyword, 
followed by the name we want to give to it, followed by
the possible values in curly braces.

Here's an example:
enum OrderStatus {
          Paid,
          Shipped,
          Completed,
          Cancelled
}

In addition, all the values can be explicitly declared, as in 
the following example:

enum OrderStatus {
          Paid = 1,
          Shipped = 2,
          Completed = 3,
          Cancelled = 0
}

Enumerations are great for data such as a status that is 
stored as a specific set of integers but actually has some 
business meaning. They make our code more readable and 
less prone to error.

conti on pg 21