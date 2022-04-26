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


-: Objects
Let's work through an example:
Let's enter the following code into the TypeScript playground, 
which creates an object with several properties of information:

const customer = {
          name: "Lamps Ltd",
          turnover: 2000134,
          active: true
};

If we hover over name , turnover , and active , we'll see that 
TypeScript has smartly inferred the types to be string , number, 
and boolean respectively.

customer.turnover = 500000

We used const to declare the customer variable and then 
was able to change one of its property values later in the 
program. Shouldn't this have thrown an error? Well, the 
customer variable reference hasn't changed —just some 
properties within it. So, this is fine with the TypeScript
compiler.

Now let's set a property on customer that doesn't exist yet:

customer.profit = 10000;

We'll see that TypeScript complains:

This makes sense if we think about it. We've declared 
customer with name , turnover , and active properties, 
so setting a profit property should cause an error. If 
we wanted a profit property, we should have declared 
it in the original declaration.

In summary, the object type is flexible because we get 
to define any properties we require, but TypeScript 
will narrow down the type to prevent us incorrectly 
typing a property name.


-: Arrays
Arrays are structures that TypeScript inherits from 
JavaScript. We add type annotations to arrays as 
usual, but with square brackets at the end to denote 
that this is an array type.

Let's take a look at an example:
Let's declare the following array of numbers 

const numbers: number[] = [];

Here, we have initialized the array as empty.

We used const to declare the numbers variable and 
was able to change its array elements later in the 
program. The array reference hasn't changed
– just the elements within it. So, this is fine with the 
TypeScript compiler.

We can use type inference to save a few keystrokes 
if we declare an array with some initial values. As 
an example, if we type in the following declaration 
and hover over the numbers variable, we'll see the 
type has been inferred as number[] .

const numbers = [1, 3, 5]

while this will be type any:
const numbers = []

numbers.forEach(function (num) {
          console.log(num);
});

forEach calls a nested function for each array element, 
passing in the array element. If we hover over the num 
variable, we'll see it has been correctly inferred
as a number . We could have put a type annotation here, 
but we have saved ourselves a few keystrokes:

-: Creating interfaces, types aliases, and classes
Interfaces, type aliases, and classes are ways that we can
define an object structure before we start using it.

Following here is the customer object we worked with, 
where we declared the customer variable with an initial 
object value:

const customer = {
          name: "Lamps Ltd",
          turnover: 2000134,
          active: true
};

1. Let's try to declare the customer variable and set its value 
on a subsequent line:

let customer: object;
          
customer = {
          name: "Lamps Ltd",
          turnover: 2000134,
          active: true
};

2. So far, so good. However, let's see what happens when we 
try to change the customers turnover value:
customer.turnover = 2000200;

3. The lack of IntelliSense when we type turnover isn't what 
we are used to. When we've finished typing the line, we get 
a compiler error:
Property 'turnover' does not exist on type 'object'.

The TypeScript compiler doesn't know about the properties 
in the customer object and so thinks there's a problem.

So, we need another way of defining an object structure with 
the ability to set property values later in the program. That's 
where interfaces, type aliases, and classes come in; they
let us define the structure of an object by letting us define our 
own types.


-: Interfaces
We create an interface with the interface keyword, followed 
by its name, followed by the bits that make up the interface 
in curly braces:

interface Product {
          ...
}









https://www.typescriptlang.org/play/

conti on pg 31