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


-: JavaScript rest and spread syntax
In JavaScript, a rest parameter collects multiple arguments 
and condenses them into a single argument. It is called rest 
because it collects the rest of the arguments into a single
argument.

We define a rest parameter with three dots preceding the 
parameter name.

1. Let's create a logScores function that takes in a scores 
rest parameter that just outputs the parameter to the console:
function logScores(...scores) {
          console.log(scores)
}

2. We can call logScores as follows:
logScores(50, 85, 75);

If we run this, we'll get an array of the three elements we passed 
in as parameters output to the console. So, our scores parameter 
has collected all the arguments into an array.

The spread syntax is the opposite of rest parameters. It allows an 
iterable, such as array, to be expanded into function arguments

Let's redefine our logScore function with specific parameters:
function logScore(score1, score2, score3) {
          console.log(score1, score2, score3)
}

2. Let's define a scores array:
const scores = [75, 65, 80];

3. Finally, let's use the spread syntax to pass our scores 
variable into our logScore function:
logScore(...scores);


-: Open-ended tuples
rest elements are similar to rest parameters, described in 
the last section, but they work with tuple element types. 
A rest element allows us to define an open-ended tuple.

let's create a tuple with the first element being a
string and subsequent elements being numbers:

type Scores = [string, ...number[]]

2. We should be able to use this structure to store someone's 
name with an infinite amount of scores. Let's give this a go 
for Billy and three scores:

const billyScores: Scores = ["Billy", 60, 70, 75];

3. Let's move on to try Sally and four scores:
const sallyScores: Scores = ["Sally", 60, 70, 75, 70];

Both these variables compile fine, as we would expect, 
because we have defined the numbers as open-ended.

-: Tuple function parameters
function logScores(...scores) {
          console.log(scores);
}

We can now make this example strongly-typed with a 
tuple rest parameter.
function logScores(...scores: [...number[]]) {
          console.log(scores);
}

logScores(50, 85, 75);

We can create an enhanced version of our function that 
uses the Scores type from the Open-ended tuples section.

type Scores = {string, ...number[]}

function logNameAndScores(...scores: Scores) {
          console.log(scores)
}

logNameAndScores("Sally", 60, 70, 75, 70);


-: 


https:/​ / ​ www.​ typescriptlang.​ org/play/

conti on pg 88
*/ 