/*
You can check your TypeScript version by using the 
following command in a terminal:
tsc -v


-; Tuples
A tuple is like an array but the number of elements are 
fixed. It's a simple way to structure data and use some 
type safety.

Let's have a play with tuples:
let product: [string, number]

We've initialized a product variable to a tuple type with 
two elements. The first element is a string and the 
second a number.

2. We can store a product name and its unit price in 
the product variable on the next line, as follows:
product = ["Table", 500];

3. Let's try to store the product name and unit price 
the other way around:
product = [500, "Table"];

Not surprisingly, we get a compilation error. If we 
hover over 500 , the compiler quite rightly complains 
that it was expecting a string. If we hover over "Table" ,
the compiler complains that it expects a number:

tuples tell us nothing about what should be in the
elements. So, they are nice for small structures or 
structures where the elements are obvious.

We can iterate through elements in a tuple like we 
can an array, using a for loop or the array forEach 
function

The enhancements have been largely driven by the 
popularity of JavaScript's rest and spread syntax




https:/​ / ​ www.​ typescriptlang.​ org/play/

conti on pg 88
*/ 